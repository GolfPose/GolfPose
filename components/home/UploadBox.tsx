import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BadgeCent } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import useUserStore from '@/store/useUserStore';
import { ThemedText } from '../ThemedText';

export default function UploadBox() {
  //
  // const credit = useUserStore(state => state.user?.credit ?? 0);
  const credit = 64;
  const [isDisabled, setIsDisabled] = useState(credit <= 0);

  useEffect(() => {
    setIsDisabled(credit <= 0);
  }, [credit]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.creditRow}>
        <BadgeCent size={16} color="#aaa" />
        <Text style={styles.creditText}>남은 크레딧: {credit}</Text>
      </View>

      <View style={styles.uploadArea}>
        <Feather name="file-plus" size={40} color="#B2B2B2" />

        <Text style={styles.desc}>
          파일을 업로드하세요.{'\n'}
          MP4, MOV, AVI 파일을 50MB까지 업로드할 수 있습니다.
        </Text>

        <Pressable
          style={[styles.button, isDisabled && styles.disabled]}
          onPress={() => console.log('파일 업로드')}
          disabled={isDisabled}
        >
          <ThemedText style={styles.buttonText}>파일 업로드</ThemedText>
        </Pressable>
      </View>
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
    alignSelf: 'flex-start', // ← 좌측 정렬
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
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    gap: 20,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#888',
  },
  uploadText: {
    fontWeight: '600',
  },
  desc: {
    fontSize: 12,
    textAlign: 'center',
    color: '#aaa',
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
  },
});
