import { StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BadgeCent } from 'lucide-react-native';
import { useEffect, useState, useRef } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as ImagePicker from 'expo-image-picker';
import useUserStore from '@/store/useUserStore';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { Colors } from '@/constants/Colors';

export default function UploadBox() {
  // const credit = useUserStore(state => state.user?.credit ?? 0);
  const credit = 64;
  const [isDisabled, setIsDisabled] = useState(credit <= 0);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [uploadStage, setUploadStage] = useState<
    'idle' | 'picking' | 'uploading' | 'done'
  >('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
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
    setIsDisabled(credit <= 0);
  }, [credit]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleUpload = async () => {
    try {
      setUploadStage('picking');

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setUploadStage('uploading');

        timeoutRef.current = setTimeout(() => {
          setVideoUri(result.assets[0].uri);
          setUploadStage('done');
        }, 3000);
      } else {
        setUploadStage('idle');
      }
    } catch (error) {
      console.error('비디오 선택 오류:', error);
      setUploadStage('idle');
    }
  };

  return (
    <ThemedView style={styles.wrapper}>
      <ThemedView style={styles.creditRow}>
        <BadgeCent size={16} color={Colors.common.gray500} />
        <Text style={styles.creditText}>남은 크레딧: {credit}</Text>
      </ThemedView>

      <ThemedView style={styles.uploadArea}>
        {uploadStage === 'picking' ||
        (uploadStage === 'uploading' && !videoUri) ? (
          <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.common.primary500} />
            <Text style={styles.loadingText}>
              {uploadStage === 'picking' ? '업로드 준비 중...' : '업로드 중...'}
            </Text>
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
              {uploadStage === 'uploading' ? (
                <ThemedView style={styles.uploadingRow}>
                  <ActivityIndicator
                    size="small"
                    color={Colors.common.primary500}
                  />
                  <Text style={styles.overlayText}>업로드 중...</Text>
                </ThemedView>
              ) : (
                <Text style={styles.overlayText}>업로드 완료</Text>
              )}
            </ThemedView>

            <Pressable
              style={styles.deleteButton}
              onPress={() => {
                setVideoUri(null);
                setUploadStage('idle');
              }}
            >
              <Feather name="x" size={18} color={Colors.common.white} />
            </Pressable>
          </>
        ) : (
          <>
            <Feather name="file-plus" size={45} color={Colors.common.gray400} />
            <Text style={styles.desc}>
              파일을 업로드하세요.{'\n'}
              MP4, MOV, AVI 파일을 50MB까지 업로드할 수 있습니다.
            </Text>
            <Pressable
              style={[styles.button, isDisabled && styles.disabled]}
              onPress={handleUpload}
              disabled={isDisabled || uploadStage !== 'idle'}
            >
              <ThemedText style={styles.buttonText}>파일 업로드</ThemedText>
            </Pressable>
          </>
        )}
      </ThemedView>

      {videoUri && uploadStage === 'done' && (
        <Pressable
          style={styles.analyzeButton}
          onPress={() => console.log('분석하기')}
        >
          <Text style={styles.buttonText}>분석하기</Text>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  creditRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 4,
    paddingHorizontal: 16,
  },
  creditText: {
    marginBottom: 10,
    fontWeight: '500',
    color: Colors.common.gray500,
  },
  uploadArea: {
    borderWidth: 1,
    borderColor: Colors.common.gray600,
    borderStyle: 'dashed',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
    maxWidth: 320,
    aspectRatio: 16 / 9,
  },
  desc: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.common.gray200,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: Colors.common.primary500,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
  },
  disabled: {
    backgroundColor: Colors.common.gray300,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.common.black,
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  overlayText: {
    color: Colors.common.white,
    fontSize: 12,
  },
  uploadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.common.overlayBg,
    padding: 4,
    borderRadius: 16,
    zIndex: 2,
  },
  analyzeButton: {
    marginTop: 16,
    backgroundColor: Colors.common.primary500,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: Colors.common.gray500,
    fontSize: 14,
  },
});
