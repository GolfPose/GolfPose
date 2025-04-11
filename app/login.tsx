import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BackHeader from '@/components/BackHeader';
import TitleSection from '@/components/TitleSection';
import Typography from '@/constants/Typography';

export default function LoginScreen() {
  return (
    <ThemedView style={styles.container}>
      <BackHeader />
      <TitleSection title="로그인" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
  },
});
