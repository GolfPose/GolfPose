import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useEffect } from 'react';
import { s, vs } from 'react-native-size-matters';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

export default function CustomSplashScreen() {
  const theme = useTheme();
  const isDark = theme === 'dark';

  const logoSource = isDark
    ? require('../assets/images/logo.png')
    : require('../assets/images/white-logo.png');

  const opacity = useSharedValue(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 600 });
    }, 2400);
    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <ThemedView style={styles.container}>
      <Animated.Image
        source={logoSource}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: vs(80),
  },
  logo: {
    width: s(250),
    height: vs(250),
  },
});
