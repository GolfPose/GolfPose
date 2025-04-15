import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  Linking,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BackHeader from '@/components/BackHeader';
import TitleSection from '@/components/TitleSection';
import Typography from '@/constants/Typography';

const screenHeight = Dimensions.get('window').height; //사용자 핸드폰에 따른 이미지 높이 설정정

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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
    const url = 'https://www.jaisworks.com/signUp';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("지원되지 않는 URL입니다:", url);
    }
  };

  const theme = useColorScheme() as 'light' | 'dark';

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
     <ScrollView contentContainerStyle={styles.scrollContainer}>
     <StatusBar barStyle="light-content" backgroundColor="#000" />

    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* 로고 이미지 */}
      <Image
        source={require('../assets/images/white-logo.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* 아이디 입력 */}
      <Text style={styles.label}>아이디</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력하세요"
        placeholderTextColor="#888"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* 비밀번호 입력 */}
      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        placeholderTextColor="#888"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />

      {/* 로그인 버튼 */}
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>로그인</Text>
      </Pressable>

      {/* 회원가입 버튼 */}
      <Pressable style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>회원가입</Text>
      </Pressable>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

// 스타일
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
    marginTop: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#000', // 다크모드 배경
    paddingHorizontal: 24,
    padding: 24,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: screenHeight * 0.12,
    marginBottom: 36,
  },
  input: {
    height: 48,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#111',
    color: '#fff',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#10B982', // 초록색 버튼
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  loginText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    borderColor: '#10B982',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  signupText: {
    color: '#10B982',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
