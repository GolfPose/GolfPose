import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import CustomSplashScreen from './CustomSplashScreen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Platform,
  StyleSheet,
  StatusBar as RNStatusBar,
  Alert,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { restoreSession } from '@/service/auth';
import NetInfo from '@react-native-community/netinfo';
import * as Updates from 'expo-updates';
import { Buffer } from 'buffer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
global.Buffer = Buffer;

export default function RootLayout() {
  const theme = useTheme();
  const [loaded] = useFonts({
    Pretendard: require('../assets/fonts/PretendardVariable.ttf'),
  });

  const [isAppReady, setIsAppReady] = useState(false);
  const opacity = useSharedValue(0);

  const handleReload = async () => {
    try {
      await Updates.reloadAsync();
    } catch (e) {
      console.error('앱 재시작 실패', e);
    }
  };

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setIsAppReady(true);
        opacity.value = withTiming(1, { duration: 600 });
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  useEffect(() => {
    restoreSession();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert('네트워크 오류', '인터넷 연결이 끊어졌습니다.', [
          {
            text: '재시도',
            onPress: handleReload,
          },
        ]);
      }
    });

    return () => unsubscribe();
  }, []);

  /* 더미 유저
  useEffect(() => {
    const setUser = useUserStore.getState().setUser;
    setUser(dummyUser);
  }, []);
  */

  const animatedMainStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!loaded || !isAppReady) {
    return <CustomSplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaView
          style={[
            styles.safeview,
            {
              backgroundColor:
                theme === 'dark' ? Colors.common.black : Colors.common.white,
            },
          ]}
          edges={['top', 'bottom']}
        >
          <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
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
              <Stack.Screen
                name="purchase"
                options={{ headerShown: false, animation: 'none' }}
              />
            </Stack>
          </Animated.View>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
  },
});
