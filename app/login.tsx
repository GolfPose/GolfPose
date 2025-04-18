import React, { useState, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
  StyleSheet,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BackHeader from '@/components/BackHeader';
import TitleSection from '@/components/TitleSection';
import { Colors } from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { s, vs } from 'react-native-size-matters';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const theme = useColorScheme() as 'light' | 'dark';

  const handleEmailChange = (text: string) => {
    // 공백 제거
    const cleaned = text.replace(/\s/g, '');
    setEmail(cleaned);
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePasswordChange = (text: string) => {
    // 영어 대소문자 + 숫자만 허용
    const cleaned = text.replace(/[^a-zA-Z0-9]/g, '');
    setPassword(cleaned);
  };

  const handleLogin = () => {
    if (!isEmailValid(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    if (password.length < 4) {
      alert('비밀번호는 4자 이상 입력해주세요.');
      return;
    }
    console.log('로그인 시도:', email, password);
    console.log('로그인 성공!');
  };

  const handleSignup = async () => {
    router.push('/signup');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === 'dark' ? Colors.common.black : Colors.common.white,
        },
      ]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          showsVerticalScrollIndicator={true}
        >
          <BackHeader theme={theme} />
          <ThemedView style={styles.innerContainer}>
            <TitleSection title="로그인" />
            <ThemedView style={styles.inputContainer}>
              {/* 아이디 */}
              <ThemedText style={styles.label}>아이디</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    color:
                      theme === 'dark'
                        ? Colors.common.white
                        : Colors.common.black,
                    backgroundColor:
                      theme === 'dark'
                        ? Colors.common.black
                        : Colors.common.white,
                  },
                ]}
                placeholder="아이디를 입력해 주세요."
                placeholderTextColor={Colors.common.gray600}
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* 비밀번호 */}
              <ThemedText style={styles.label}>비밀번호</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    color:
                      theme === 'dark'
                        ? Colors.common.white
                        : Colors.common.black,
                    backgroundColor:
                      theme === 'dark'
                        ? Colors.common.black
                        : Colors.common.white,
                  },
                ]}
                placeholder="비밀번호를 입력해 주세요."
                placeholderTextColor={Colors.common.gray600}
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
              />

              {/* 로그인 버튼 */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.loginText}>로그인</ThemedText>
              </TouchableOpacity>

              {/* 회원가입 버튼 */}
              <TouchableOpacity
                style={styles.signupButton}
                onPress={handleSignup}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.signupText}>회원가입</ThemedText>
              </TouchableOpacity>

              {/* 추가 여백 */}
              <View style={{ height: vs(40) }} />
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loginButton: {
    backgroundColor: Colors.common.primary500,
    paddingVertical: vs(12),
    borderRadius: s(8),
    marginTop: vs(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    textAlign: 'center',
    fontSize: Typography.md,
    fontWeight: 'bold',
  },
  signupButton: {
    borderColor: Colors.common.primary500,
    borderWidth: 1,
    paddingVertical: vs(12),
    borderRadius: s(8),
    marginTop: vs(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    color: Colors.common.primary500,
    textAlign: 'center',
    fontSize: Typography.md,
    fontWeight: 'bold',
  },
});
