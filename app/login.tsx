import { StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BackHeader from '@/components/BackHeader';
import TitleSection from '@/components/TitleSection';
import Typography from '@/constants/Typography';

export default function LoginScreen() {
  const theme = useColorScheme() as 'light' | 'dark';

  return (
    <ThemedView style={styles.container}>
      <BackHeader theme={theme} />
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
