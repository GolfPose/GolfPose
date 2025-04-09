import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BadgeCent } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import useUserStore from '@/store/useUserStore';
import { ThemedText } from '../ThemedText';

export default function UploadBox() {
  const credit = 64;
  const [isDisabled, setIsDisabled] = useState(credit <= 0);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const player = useVideoPlayer(
    videoUri ? { uri: videoUri } : { uri: '' },
    player => {
      if (videoUri) {
        player.loop = true;
        player.play();
      }
    },
  );
  const isPlaying = player
    ? useEvent(player, 'playingChange', {
        isPlaying: player.playing,
      }).isPlaying
    : false;

  useEffect(() => {
    setIsDisabled(credit <= 0);
  }, [credit]);

  const handleUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setUploading(true);
      setTimeout(() => {
        setVideoUri(result.assets[0].uri);
        setUploading(false);
      }, 1000);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.creditRow}>
        <BadgeCent size={16} color="#aaa" />
        <Text style={styles.creditText}>남은 크레딧: {credit}</Text>
      </View>

      <View style={styles.uploadArea}>
        {videoUri ? (
          <>
            <VideoView
              style={styles.video}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>
                {uploading ? '업로드 중...' : '업로드 완료'}
              </Text>
            </View>

            <Pressable
              style={styles.deleteButton}
              onPress={() => setVideoUri(null)}
            >
              <Feather name="x" size={18} color="#fff" />
            </Pressable>
          </>
        ) : (
          <>
            <Feather name="file-plus" size={40} color="#B2B2B2" />
            <Text style={styles.desc}>
              파일을 업로드하세요.{'\n'}
              MP4, MOV, AVI 파일을 50MB까지 업로드할 수 있습니다.
            </Text>
            <Pressable
              style={[styles.button, isDisabled && styles.disabled]}
              onPress={handleUpload}
              disabled={isDisabled || uploading}
            >
              <ThemedText style={styles.buttonText}>파일 업로드</ThemedText>
            </Pressable>
          </>
        )}
      </View>

      {videoUri && !uploading && (
        <Pressable
          style={styles.analyzeButton}
          onPress={() => console.log('분석하기')}
        >
          <Text style={styles.buttonText}>분석하기</Text>
        </Pressable>
      )}
    </View>
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
    marginBottom: 20,
    fontWeight: '500',
    color: '#aaa',
  },
  uploadArea: {
    borderWidth: 1,
    borderColor: '#888',
    borderStyle: 'dashed',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
    maxWidth: 320,
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
  },
  desc: {
    fontSize: 12,
    textAlign: 'center',
    color: '#aaa',
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#00C49A',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 6,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  overlayText: {
    color: '#fff',
    fontSize: 12,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 4,
    borderRadius: 16,
    zIndex: 2,
  },
  analyzeButton: {
    marginTop: 16,
    backgroundColor: '#00C49A',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
});
