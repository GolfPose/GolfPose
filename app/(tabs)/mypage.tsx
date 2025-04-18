import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Typography from '@/constants/Typography';

export default function MyPageScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>마이페이지</ThemedText>
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
