// components/home/TitleSection.tsx

import { StyleSheet, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TitleSection() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>골프 포즈 분석하기</ThemedText>
      <Text style={styles.desc}>
        mp4, mov, avi 파일을 업로드하여{'\n'}
        사용자의 포즈패턴을 분석하고{'\n'}스윙 자세를 진단합니다.
      </Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
    color: 'gray',
  },
});
