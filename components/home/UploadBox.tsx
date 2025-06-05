import { StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import BadgeCent from '@/assets/svgs/badge-cent.svg';
import { useEffect, useState, useRef } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as ImagePicker from 'expo-image-picker';
import useUserStore from '@/store/useUserStore';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { Colors } from '@/constants/Colors';
import { s, vs, ms } from 'react-native-size-matters';
import Typography from '@/constants/Typography';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/lib/supabase';
import { UserInfo } from '@/types/user';
import { CustomAlert } from '../CustomAlert';

type PickedAsset = NonNullable<ImagePicker.ImagePickerResult['assets']>[0];

export default function UploadBox() {
  const credit = useUserStore(state => state.user?.credit ?? 0);
  const useCredit = useUserStore(state => state.useCredit);

  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<PickedAsset | null>(null);
  const [uploadStage, setUploadStage] = useState<
    'idle' | 'picking' | 'selected' | 'uploading' | 'analyzing'
  >('idle');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertConfirmOnly, setAlertConfirmOnly] = useState(true);
  const [onAlertConfirm, setOnAlertConfirm] = useState<() => void>(() => () => { });

  const timeoutRef = useRef<number | null>(null);
  const player = useVideoPlayer(
    videoUri ? { uri: videoUri } : { uri: '' },
    player => {
      if (videoUri) {
        player.loop = true;
        player.play();
      }
    },
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showAlert = (message: string, confirmOnly = true, onConfirm?: () => void) => {
    setAlertMessage(message);
    setAlertConfirmOnly(confirmOnly);
    setOnAlertConfirm(() => onConfirm || (() => { }));
    setAlertVisible(true);
  };

  const handlePressUploadButton = async () => {
    const user = useUserStore.getState().user;

    if (!user || !user?.isLoggedIn) {
      showAlert('로그인이 필요한 서비스입니다.', true, () => router.replace({ pathname: '/login', params: { fromRedirect: 'true' } }));
      return;
    }

    if (user.credit <= 8) {
      showAlert('보유 크레딧이 부족하여 분석을 할 수 없습니다. 크레딧을 충전해주세요.', true, () => router.replace({ pathname: '/credit' }));
      return;
    }

    await handlePicking();
  };

  const handlePicking = async () => {
    try {
      setUploadStage('picking');
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['videos'], allowsEditing: false, quality: 1 });
      if (!result.canceled && result.assets?.[0]?.uri) {
        const fileUri = result.assets[0].uri;
        const fileExt = fileUri.split('.').pop()?.toLowerCase();
        const allowedExts = ['mp4', 'mov', 'avi'];
        if (!fileExt || !allowedExts.includes(fileExt)) {
          showAlert('MP4, MOV, AVI 파일만 업로드 가능합니다.');
          setUploadStage('idle');
          return;
        }
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (!fileInfo.exists || fileInfo.size === undefined) {
          showAlert('파일 크기를 확인할 수 없습니다.');
          setUploadStage('idle');
          return;
        }
        if (fileInfo.size > 100 * 1024 * 1024) {
          showAlert('100MB 이하 파일만 업로드 가능합니다.');
          setUploadStage('idle');
          return;
        }
        setVideoUri(fileUri);
        setSelectedAsset(result.assets[0]);
        setUploadStage('selected');
      } else {
        setUploadStage('idle');
      }
    } catch (error) {
      showAlert('비디오 선택 중 오류가 발생했습니다.');
      setUploadStage('idle');
    }
  };

  const handleUploadAndAnalyze = async (user: UserInfo, asset: PickedAsset) => {
    try {
      setUploadStage('uploading');

      const fileUri = asset.uri;
      const fileExt = fileUri.split('.').pop()?.toLowerCase();
      const fileName = `${Date.now()}.${fileExt}`;

      // 1. pre-signed URL 요청
      const presignedBody = {
        fileName,
        userId: user.id,
      };

      console.log('=== 1. Pre-signed URL 요청 Body ===');
      console.log(JSON.stringify(presignedBody, null, 2));

      const presignRes = await fetch(
        process.env.EXPO_PUBLIC_PRESIGNED_URL_ENDPOINT!,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(presignedBody),
        },
      );
      const { uploadUrl, fileUrl } = await presignRes.json();

      // 2. 파일 읽기 (binary)
      const fileBinary = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 3. S3에 PUT 업로드 - Body 로깅
      console.log('=== 2. S3 업로드 Body ===');
      console.log('Content-Type:', asset.mimeType || 'video/mp4');
      console.log('Content-Disposition: inline');
      console.log('Body: Buffer.from(base64 파일 데이터)');
      console.log('파일 크기 (base64):', fileBinary.length, 'characters');

      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': asset.mimeType || 'video/mp4',
          'Content-Disposition': 'inline',
        },
        body: Buffer.from(fileBinary, 'base64'),
      });

      if (!uploadRes.ok) throw new Error('S3 업로드 실패');

      console.log('S3 업로드 완료:', fileUrl);

      // 4. Supabase insert - Body 로깅
      const supabaseInsertData = {
        user_id: user.id,
        original_video_url: fileUrl,
        status: 'IN_PROGRESS',
        created_at: new Date().toISOString(),
      };

      console.log('=== 3. Supabase Insert Body ===');
      console.log(JSON.stringify(supabaseInsertData, null, 2));

      const { data, error } = await supabase
        .from('golfpose')
        .insert(supabaseInsertData)
        .select('*');

      if (error) throw error;

      const golfPoseId = data[0].id;
      console.log('Supabase 저장 완료:', golfPoseId);

      // 5. 분석 요청 - Body 로깅
      const analysisBody = {
        golf_pose_id: golfPoseId,
        s3_url: fileUrl,
        user_id: user.id,
      };

      console.log('=== 4. AWS Lambda 분석 요청 Body ===');
      console.log(JSON.stringify(analysisBody, null, 2));

      setUploadStage('analyzing');
      const analysisRes = await fetch(
        process.env.EXPO_PUBLIC_ANALYSIS_URL_ENDPOINT!,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(analysisBody),
        },
      );

      console.log(
        '분석 요청 결과:',
        analysisRes.status,
        analysisRes.statusText,
      );

      // 6. 크레딧 차감 (로컬 state 업데이트)
      useCredit(8, {
        id: golfPoseId,
        date: new Date().toISOString(),
        change: -8,
        type: 'USE',
      });

      Alert.alert('분석 요청 성공', '분석이 시작되었습니다!');
      router.replace('/history');
    } catch (error) {
      if (error instanceof Error) {
        console.error('업로드/분석 오류:', error.message);
        Alert.alert('오류 발생', error.message);
      } else {
        console.error('알 수 없는 오류:', error);
        Alert.alert('오류 발생', '알 수 없는 오류가 발생했습니다.');
      }
      setUploadStage('selected'); // 실패 시 선택된 상태로 되돌리기
    }
  };

  const handleAnalyze = async () => {
    const user = useUserStore.getState().user;

    if (!user || !selectedAsset) {
      showAlert('선택된 파일 정보가 없습니다.');
      return;
    }
    setAlertConfirmOnly(false);
    setAlertMessage('이 영상을 분석하시겠습니까? 8크레딧이 차감됩니다.');
    setOnAlertConfirm(() => async () => {
      setAlertVisible(false);
      setIsAnalyzing(true);
      try {
        await handleUploadAndAnalyze(user, selectedAsset);
      } finally {
        setIsAnalyzing(false);
      }
    });
    setAlertVisible(true);
  };


  const handleReset = () => {
    setVideoUri(null);
    setSelectedAsset(null);
    setUploadStage('idle');
    setIsAnalyzing(false);
  };

  return (
    <ThemedView style={styles.wrapper}>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
        confirmText="확인"
        cancelText={!alertConfirmOnly ? '취소' : undefined}
        onConfirm={() => {
          onAlertConfirm();
          setAlertVisible(false);
        }}
      />
      <ThemedView style={styles.creditRow}>
        <BadgeCent
          width={s(16)}
          height={s(16)}
          stroke={Colors.common.gray500}
        />
        <ThemedText style={styles.creditText}>남은 크레딧: {credit}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.uploadArea}>
        {uploadStage === 'picking' ? (
          <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.common.primary500} />
            <ThemedText style={styles.loadingText}>파일 선택 중...</ThemedText>
          </ThemedView>
        ) : uploadStage === 'uploading' ? (
          <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.common.primary500} />
            <ThemedText style={styles.loadingText}>업로드 중...</ThemedText>
          </ThemedView>
        ) : uploadStage === 'analyzing' ? (
          <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.common.primary500} />
            <ThemedText style={styles.loadingText}>분석 요청 중...</ThemedText>
          </ThemedView>
        ) : videoUri ? (
          <>
            <VideoView
              style={styles.video}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
            <ThemedView style={styles.overlay}>
              <ThemedText style={styles.overlayText}>선택 완료</ThemedText>
            </ThemedView>

            <Pressable
              style={styles.deleteButton}
              onPress={handleReset}
              disabled={isAnalyzing}
            >
              <Feather name="x" size={s(18)} color={Colors.common.white} />
            </Pressable>
          </>
        ) : (
          <>
            <Feather
              name="file-plus"
              size={s(45)}
              color={Colors.common.gray400}
            />
            <ThemedText style={styles.desc}>
              파일을 업로드하세요.{'\n'}
              MP4, MOV, AVI 파일을 100MB까지{'\n'}업로드할 수 있습니다.
            </ThemedText>
            <Pressable
              style={styles.button}
              onPress={handlePressUploadButton}
              disabled={uploadStage !== 'idle'}
            >
              <ThemedText style={styles.buttonText}>파일 선택</ThemedText>
            </Pressable>
          </>
        )}
      </ThemedView>

      {videoUri && uploadStage === 'selected' && (
        <Pressable
          style={styles.analyzeButton}
          onPress={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <ActivityIndicator size="small" color={Colors.common.black} />
          ) : (
            <ThemedText style={styles.buttonText}>분석하기</ThemedText>
          )}
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: vs(24),
    width: '100%',
  },
  creditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: s(4),
    paddingHorizontal: s(12),
    marginBottom: vs(10),
  },
  creditText: {
    fontWeight: '500',
    color: Colors.common.gray500,
    fontSize: Typography.sm,
  },
  uploadArea: {
    borderWidth: 1,
    borderColor: Colors.common.gray600,
    borderStyle: 'dashed',
    borderRadius: s(12),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: s(300),
    aspectRatio: 16 / 9,
    gap: s(12),
  },
  desc: {
    fontSize: Typography.xs,
    textAlign: 'center',
    color: Colors.common.gray200,
    paddingHorizontal: s(12),
  },
  button: {
    backgroundColor: Colors.common.primary500,
    paddingHorizontal: s(24),
    paddingVertical: vs(6),
    borderRadius: s(6),
  },
  disabled: {
    backgroundColor: Colors.common.gray300,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.common.black,
    fontSize: Typography.sm,
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    left: s(8),
    bottom: vs(8),
    paddingHorizontal: s(6),
    paddingVertical: vs(2),
    borderRadius: s(4),
    zIndex: 1,
  },
  overlayText: {
    fontSize: Typography.xs,
  },
  uploadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
  },
  deleteButton: {
    position: 'absolute',
    top: vs(8),
    right: s(8),
    backgroundColor: Colors.common.overlayBg,
    padding: ms(4),
    borderRadius: s(16),
    zIndex: 2,
  },
  analyzeButton: {
    marginTop: vs(16),
    backgroundColor: Colors.common.primary500,
    paddingHorizontal: s(32),
    paddingVertical: vs(10),
    borderRadius: s(8),
    width: '100%',
    maxWidth: s(320),
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(12),
  },
  loadingText: {
    color: Colors.common.gray500,
    fontSize: Typography.sm,
  },
});
