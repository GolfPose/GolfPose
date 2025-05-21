import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { LoginContainer } from '@/components/login/LoginContainer';

export default function LoginScreen() {
  const params = useLocalSearchParams();
  const isFromRedirect = params.fromRedirect === 'true';
  return <LoginContainer isFromRedirect={isFromRedirect} />;
}