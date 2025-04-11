import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Typography from '@/constants/Typography';

export default function NotFoundScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>페이지 없음</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
  },
});
