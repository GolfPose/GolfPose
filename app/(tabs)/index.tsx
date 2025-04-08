import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Header showUserInfo />
      <ThemedView style={styles.contents}>
        <ThemedText style={styles.title}>분석하기</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contents: { flex: 1 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
