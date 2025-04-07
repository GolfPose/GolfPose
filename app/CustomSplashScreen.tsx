import { StyleSheet, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from 'react-native';

export default function CustomSplashScreen() {
  const colorScheme = useColorScheme();

  const logoSource =
    colorScheme === 'dark'
      ? require('../assets/images/logo.png')
      : require('../assets/images/white-logo.png');

  return (
    <ThemedView style={styles.container}>
      <Image source={logoSource} style={styles.logo} resizeMode="contain" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  logo: {
    width: 250,
    height: 250,
  },
});
