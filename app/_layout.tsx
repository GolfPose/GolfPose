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
  SafeAreaView,
  StyleSheet,
  StatusBar as RNStatusBar,
  Text,
  TextInput,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { UserInfo } from '@/types/user';
import useUserStore from '@/store/useUserStore';

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;

(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;

export default function RootLayout() {
  const theme = useTheme();
  const [loaded] = useFonts({
    Pretendard: require('../assets/fonts/PretendardVariable.ttf'),
  });

  const [isAppReady, setIsAppReady] = useState(false);
  const opacity = useSharedValue(0);

  /* 더미 로그인 구현 */
  const dummyUser: UserInfo = {
    name: '홍길동',
    email: 'dummy@example.com',
    plan: 'free',
    isLoggedIn: true,
    createdAt: new Date().toISOString(),
    credit: 64,
    creditRecord: [],
    purchasedRecord: [],
    myAnalysisVideos: [],
    accessToken: 'dummy-access-token',
    refreshToken: 'dummy-refresh-token',
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
    const setUser = useUserStore.getState().setUser;
    setUser(dummyUser);
  }, []);

  const animatedMainStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const topPadding =
    Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 24) : 0;

  if (!loaded || !isAppReady) {
    return <CustomSplashScreen />;
  }

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView
        style={[
          styles.safeview,
          {
            paddingTop: topPadding,
            backgroundColor:
              theme === 'dark' ? Colors.common.black : Colors.common.white,
          },
        ]}
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
