import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { SignUpInput } from './SignUpInput';
import { SignUpButton } from './SignUpButton';
import { ThemedView } from '@/components/ThemedView';
import TitleSection from '@/components/TitleSection';
import BackHeader from '@/components/BackHeader';
import { useTheme } from '@/hooks/useTheme';
import { s, vs } from 'react-native-size-matters';
import { signUp } from '@/service/auth';
import { router } from 'expo-router';
import { CustomAlert } from '../CustomAlert';

export const SignUpForm = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAfterSignup, setAlertAfterSignup] = useState(false);

  const handleEmailChange = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleaned = text.replace(/\s/g, '');
    setEmail(cleaned);
    setEmailError(
      cleaned.length === 0 || emailRegex.test(cleaned)
        ? null
        : '이메일 형식이 올바르지 않습니다',
    );
  };

  const handleNicknameChange = (text: string) => {
    setNickname(text);
    const filtered = text.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, '');
    if (text !== filtered) {
      setNicknameError('특수문자는 입력할 수 없습니다');
    } else if (filtered.length > 0 && filtered.length < 2) {
      setNicknameError('닉네임은 2자 이상이어야 해요');
    } else {
      setNicknameError(null);
    }
  };

  const handlePasswordChange = (text: string) => {
    const filtered = text.replace(/[^a-zA-Z0-9!@#]/g, '');
    setPassword(filtered);
    if (filtered.length === 0) setPasswordError(null);
    else if (text !== filtered)
      setPasswordError('사용할 수 없는 특수문자가 포함되어 있어요');
    else if (filtered.length < 6)
      setPasswordError('비밀번호는 6자 이상 입력해주세요');
    else setPasswordError(null);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmError(text !== password ? '비밀번호가 일치하지 않습니다' : '');
  };

  useEffect(() => {
    const isValid =
      email.length > 0 &&
      nickname.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      emailError === null &&
      nicknameError === null &&
      passwordError === null &&
      confirmError === '';
    setIsFormValid(isValid);
  }, [
    email,
    nickname,
    password,
    confirmPassword,
    emailError,
    nicknameError,
    passwordError,
    confirmError,
  ]);

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (loading) return;

    setLoading(true);
    console.log('회원가입 시도:', {
      email,
      nickname,
      password,
      confirmPassword,
    });

    try {
      const { success, message } = await signUp(email, password, nickname);

      if (success) {
        setAlertMessage(
          '회원가입이 완료되었습니다.\n이메일 인증을 완r료해주세요',
        );
        setAlertVisible(true);
        setAlertAfterSignup(true);
      } else {
        setAlertMessage(`회원가입 실패: ${message}`);
        setAlertVisible(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAlertMessage(`회원가입 실패: ${err.message}`);
      } else {
        setAlertMessage('회원가입 중 알 수 없는 오류가 발생했습니다.');
      }
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <BackHeader theme={theme} />
            <TitleSection title="회원 가입" />
            <ThemedView style={styles.container}>
              <SignUpInput
                label="이메일"
                value={email}
                onChangeText={handleEmailChange}
                error={emailError}
                placeholder="이메일을 입력해 주세요"
                keyboardType="email-address"
              />
              <SignUpInput
                label="닉네임"
                value={nickname}
                onChangeText={handleNicknameChange}
                error={nicknameError}
                placeholder="닉네임을 입력해 주세요"
              />
              <SignUpInput
                label="비밀번호"
                value={password}
                onChangeText={handlePasswordChange}
                error={passwordError}
                placeholder="비밀번호를 입력해 주세요"
                secureTextEntry
              />
              <SignUpInput
                label="비밀번호 확인"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                error={confirmError}
                placeholder="비밀번호를 다시 입력해 주세요"
                secureTextEntry
              />
              <SignUpButton
                onPress={handleSignup}
                disabled={!isFormValid}
                loading={loading}
              />
            </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
        <CustomAlert
          visible={alertVisible}
          message={alertMessage}
          confirmText="확인"
          onConfirm={() => {
            setAlertVisible(false);
            if (alertAfterSignup) {
              setAlertAfterSignup(false);
              router.replace('/login');
            }
          }}
          onClose={() => setAlertVisible(false)}
        />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: s(24),
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: vs(100),
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: s(24),
  },
  inputContainer: {
    marginTop: vs(32),
  },
});
