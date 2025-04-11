import { StyleSheet, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { s, vs } from 'react-native-size-matters';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function CustomSplashScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
    paddingBottom: 80,
  },
  logo: {
    width: s(250),
    height: vs(250),
  },
});
