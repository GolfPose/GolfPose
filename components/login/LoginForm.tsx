import { supabase } from "@/lib/supabase";
import { signIn } from "@/service/auth";
import useUserStore from "@/store/useUserStore";
import { UserInfo } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { vs } from "react-native-size-matters";
import { LoginInput } from "./LoginInput";
import { LoginButton } from "./LoginButton";
import { SignUpNavigateButton } from "./SignUpNavigateButton";

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleEmailChange = (text: string) => {
    // 공백 제거
    const cleaned = text.replace(/\s/g, '');
    setEmail(cleaned);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text); // 그냥 있는 그대로 받기
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!isEmailValid(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    if (password.length < 4) {
      alert('비밀번호는 4자 이상 입력해주세요.');
      return;
    }

    console.log('로그인 시도:', email, password);

    try {
      const data = await signIn(email, password);
      console.log('로그인 성공:', data);

      const { user, access_token, refresh_token } = data.session;

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('display_name')
        .eq('uid', user.id)
        .single();

      const userInfo: UserInfo = {
        name: profile!.display_name,
        email: user.email!,
        plan: 'free',
        isLoggedIn: true,
        createdAt: user.created_at,
        credit: 0,
        creditRecord: [],
        myAnalysisVideos: [],
        accessToken: access_token,
        refreshToken: refresh_token,
      };

      // Zustand 저장
      const setUser = useUserStore.getState().setUser;
      setUser(userInfo);

      // AsyncStorage 저장
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));

      alert('로그인 성공!');
      router.replace('/'); // 홈 또는 메인 페이지로 이동
    } catch (err: any) {
      console.error('로그인 실패:', err.message);
      alert(`로그인 실패: ${err.message}`);
    }
  };

  const handleSignup = async () => {
    router.push('/signup');
  };

  return (
    <View style={styles.inputContainer}>
      <LoginInput
        label="아이디"
        placeholder="아이디를 입력해 주세요."
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <LoginInput
        label="비밀번호"
        placeholder="비밀번호를 입력해 주세요."
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <LoginButton onPress={handleLogin} />
      <SignUpNavigateButton onPress={handleSignup} />
      <View style={{ height: vs(40) }} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: vs(32),
  },
});