import React, { useState } from 'react';
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
  useColorScheme,
  View,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BackHeader from '@/components/BackHeader';
import TitleSection from '@/components/TitleSection';
import { Colors } from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { s, vs } from 'react-native-size-matters';

export default function SignUpScreen() {
  const theme = useColorScheme() as 'light' | 'dark';
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('이메일을 입력하세요');
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('닉네임을 입력하세요');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('비밀번호를 입력하세요');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const handleSignup = () => {
    // TODO: 유효성 검사 및 회원가입 로직 추가
    console.log('회원가입 시도:', {
      email,
      nickname,
      password,
      confirmPassword,
    });
  };

  const handleEmailChange = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //이메일 조건문
    const cleaned = text.replace(/\s/g, ''); // 공백 제거
    setEmail(cleaned);

    if (cleaned.length === 0) {
      setEmailError('이메일을 입력하세요');
    } else if (!emailRegex.test(cleaned)) {
      setEmailError('이메일 형식이 올바르지 않습니다');
    } else {
      setEmailError('');
    }
  };

  const handleNicknameChange = (text: string) => {
    const filtered = text.replace(/[^가-힣a-zA-Z0-9]/g, ''); // 한글, 영문, 숫자만 입력 가능
    setNickname(filtered);

    if (text !== filtered) {
      setNicknameError('특수문자는 입력할 수 없습니다');
    } else if (filtered.length > 0 && filtered.length < 2) {
      setNicknameError('닉네임은 2자 이상이어야 해요');
    } else {
      setNicknameError('');
    }
  };
  const handlePasswordChange = (text: string) => {
    const filtered = text.replace(/[^a-zA-Z0-9!@#]/g, ''); // 영문, 숫자, !, @, #만 입력 가능
    setPassword(filtered);

    if (text !== filtered) {
      setPasswordError('사용할 수 없는 특수문자가 포함되어 있어요');
    } else if (filtered.length < 6) {
      setPasswordError('비밀번호는 6자 이상 입력해주세요');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);

    if (text !== password) {
      setConfirmError('비밀번호가 일치하지 않습니다');
    } else {
      setConfirmError('');
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
              {/* 이메일 */}
              <ThemedText style={styles.label}>이메일</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  theme === 'dark' && styles.inputDark,
                  emailError && styles.inputError,
                ]}
                placeholder="이메일을 입력해 주세요"
                placeholderTextColor={
                  theme === 'dark'
                    ? Colors.common.gray600
                    : Colors.common.gray600
                }
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {!!emailError && (
                <ThemedText style={styles.errorText}>{emailError}</ThemedText>
              )}

              {/* 닉네임 */}
              <ThemedText style={styles.label}>닉네임</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  theme === 'dark' && styles.inputDark,
                  nicknameError && styles.inputError,
                ]}
                placeholder="닉네임을 입력해 주세요"
                placeholderTextColor={
                  theme === 'dark'
                    ? Colors.common.gray600
                    : Colors.common.gray600
                }
                value={nickname}
                onChangeText={handleNicknameChange}
                autoCapitalize="none"
              />
              {!!nicknameError && (
                <ThemedText style={styles.errorText}>
                  {nicknameError}
                </ThemedText>
              )}

              {/* 비밀번호 */}
              <ThemedText style={styles.label}>비밀번호</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  theme === 'dark' && styles.inputDark,
                  passwordError && styles.inputError,
                ]}
                placeholder="비밀번호를 입력해 주세요"
                placeholderTextColor={
                  theme === 'dark'
                    ? Colors.common.gray600
                    : Colors.common.gray600
                }
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
              />
              {!!passwordError && (
                <ThemedText style={styles.errorText}>
                  {passwordError}
                </ThemedText>
              )}

              {/* 비밀번호 확인 */}
              <ThemedText style={styles.label}>비밀번호 확인</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  theme === 'dark' && styles.inputDark,
                  confirmError && styles.inputError,
                ]}
                placeholder="비밀번호를 다시 입력해 주세요"
                placeholderTextColor={
                  theme === 'dark'
                    ? Colors.common.gray600
                    : Colors.common.gray600
                }
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                secureTextEntry
              />
              {!!confirmError && (
                <ThemedText style={styles.errorText}>{confirmError}</ThemedText>
              )}

              {/* 회원가입 버튼 */}
              <Pressable style={styles.button} onPress={handleSignup}>
                <ThemedText style={styles.buttonText}>회원가입</ThemedText>
              </Pressable>
            </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

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
  label: {
    fontSize: Typography.md,
    marginBottom: vs(10),
    marginTop: vs(10),
  },
  input: {
    borderColor: Colors.common.gray500,
    borderWidth: 1,
    borderRadius: s(8),
    paddingHorizontal: s(16),
    paddingVertical: vs(10),
    marginBottom: vs(16),
    fontSize: Typography.md,
  },
  inputDark: {
    backgroundColor: Colors.dark.background,
    borderColor: Colors.dark.gray500,
    borderWidth: 1,
    borderRadius: s(8),
    paddingHorizontal: s(16),
    paddingVertical: vs(10),
    marginBottom: vs(16),
    fontSize: Typography.md,
    color: Colors.dark.text,
  },
  button: {
    borderColor: Colors.common.primary500,
    borderWidth: 1,
    paddingVertical: vs(12),
    borderRadius: s(8),
    marginTop: vs(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.common.primary500,
    fontSize: Typography.md,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputError: {
    borderColor: Colors.common.red,
  },
  errorText: {
    color: Colors.common.red,
    fontSize: Typography.sm,
    marginTop: vs(4),
    paddingLeft: s(4),
  },
});
