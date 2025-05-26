import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { vs } from 'react-native-size-matters';
import { LoginInput } from './LoginInput';
import { LoginButton } from './LoginButton';
import { SignUpNavigateButton } from './SignUpNavigateButton';
import { login } from '@/service/auth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleEmailChange = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    setEmail(cleaned);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
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

    try {
      await login(email, password);
      alert('로그인 성공!');
      router.replace('/');
    } catch (err: any) {
      console.error('로그인 실패:', err.message);
      alert(`로그인 실패: ${err.message}`);
    }
  };

  const handleSignup = () => {
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
