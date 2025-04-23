import { StyleSheet, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { s, vs } from 'react-native-size-matters';
import Typography from '@/constants/Typography';

export default function HomeTitleSection() {
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
    marginTop: vs(20),
    marginBottom: vs(20),
    paddingHorizontal: s(16),
  },
  title: {
    fontSize: Typography.title,
    fontWeight: 'bold',
    marginBottom: vs(12),
  },
  desc: {
    fontSize: Typography.md,
    textAlign: 'center',
    lineHeight: vs(16),
    color: 'gray',
  },
});
