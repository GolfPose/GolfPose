import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import CustomSplashScreen from './CustomSplashScreen';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Pretendard: require('../assets/fonts/PretendardVariable.ttf'),
  });

  const [isAppReady, setIsAppReady] = useState(false);

  // 앱 실행 시 1.5초간 로딩페이지 렌더링
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setIsAppReady(true);
        SplashScreen.hideAsync();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!loaded || !isAppReady) {
    return <CustomSplashScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
