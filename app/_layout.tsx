import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomSplashScreen from './CustomSplashScreen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar as RNStatusBar,
} from 'react-native';
import { Colors } from '@/constants/Colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Pretendard: require('../assets/fonts/PretendardVariable.ttf'),
  });

  const [isAppReady, setIsAppReady] = useState(false);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setIsAppReady(true);
        opacity.value = withTiming(1, { duration: 600 });
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  const animatedMainStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const topPadding =
    Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) : 0;

  if (!loaded || !isAppReady) {
    return <CustomSplashScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView
        style={[
          styles.safeview,
          {
            paddingTop: topPadding,
            backgroundColor:
              colorScheme === 'dark'
                ? Colors.common.black
                : Colors.common.white,
          },
        ]}
      >
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Animated.View style={[{ flex: 1 }, animatedMainStyle]}>
          <Stack screenOptions={{ animation: 'fade' }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="login"
              options={{ headerShown: false, animation: 'none' }}
            />
            <Stack.Screen
              name="signup"
              options={{ headerShown: false, animation: 'none' }}
            />
          </Stack>
        </Animated.View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
  },
});
