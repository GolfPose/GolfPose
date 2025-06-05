import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { vs } from 'react-native-size-matters';
import { LoginInput } from './LoginInput';
import { LoginButton } from './LoginButton';
import { SignUpNavigateButton } from './SignUpNavigateButton';
import { login } from '@/service/auth';
import { CustomAlert } from '..//CustomAlert';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAfterLogin, setAlertAfterLogin] = useState(false);
  const alertAfterLoginRef = useRef(false);

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
    if (loading) return;

    if (!isEmailValid(email)) {
      setAlertMessage('올바른 이메일 형식을 입력해주세요.');
      setAlertVisible(true);
      return;
    }

    if (password.length < 4) {
      setAlertMessage('비밀번호는 4자 이상 입력해주세요.');
      setAlertVisible(true);
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      setAlertMessage('로그인에 성공하셨습니다.');
      setAlertVisible(true);
      setAlertAfterLogin(true);
    } catch (err: any) {
      setAlertMessage(`로그인 실패: ${err.message}`);
      setAlertVisible(true);
    } finally {
      setLoading(false);
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
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        confirmText="확인"
        onConfirm={() => {
          setAlertVisible(false);
          setTimeout(() => {
            if (alertAfterLogin) {
              setAlertAfterLogin(false);
              router.replace('/');
            }
          });
        }}
          onClose={() => setAlertVisible(false)}
      />

      <LoginButton onPress={handleLogin} loading={loading} />
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