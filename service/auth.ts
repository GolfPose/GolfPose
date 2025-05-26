import * as SecureStore from 'expo-secure-store';
import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/useUserStore';

export async function login(email: string, password: string) {
  const { setUser } = useUserStore.getState();

  const { data: sessionData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const { data: emailCheck } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error.message === 'Invalid login credentials') {
      if (!emailCheck) {
        throw new Error('존재하지 않는 이메일입니다.');
      } else {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
    }

    if (error.message === 'Email not confirmed') {
      await supabase.auth.resend({
        type: 'signup',
        email,
      });
      throw new Error('이메일 인증이 필요합니다. 이메일을 확인해주세요.');
    }

    throw new Error(error.message);
  }

  const { user, session } = sessionData;

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('display_name')
    .eq('uid', user.id)
    .single();

  if (profileError) {
    throw new Error('프로필 정보를 가져오지 못했습니다.');
  }

  setUser({
    name: profile.display_name,
    email: user.email!,
    plan: 'free',
    isLoggedIn: true,
    createdAt: user.created_at,
    credit: 0,
    creditRecord: [],
    myAnalysisVideos: [],
  });

  await SecureStore.setItemAsync('access_token', session.access_token);
  await SecureStore.setItemAsync('refresh_token', session.refresh_token);

  return true;
}

export async function logout() {
  const { clearUser } = useUserStore.getState();

  await supabase.auth.signOut();
  await SecureStore.deleteItemAsync('access_token');
  await SecureStore.deleteItemAsync('refresh_token');
  clearUser();

  return true;
}

export async function restoreSession() {
  const { setUser, clearUser } = useUserStore.getState();

  const accessToken = await SecureStore.getItemAsync('access_token');
  const refreshToken = await SecureStore.getItemAsync('refresh_token');

  if (!accessToken || !refreshToken) {
    clearUser();
    return false;
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error || !data.session) {
    clearUser();
    return false;
  }

  const user = data.session.user;

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('display_name')
    .eq('uid', user.id)
    .single();

  if (profileError) {
    clearUser();
    return false;
  }

  setUser({
    name: profile.display_name,
    email: user.email!,
    plan: 'free',
    isLoggedIn: true,
    createdAt: user.created_at,
    credit: 0,
    creditRecord: [],
    myAnalysisVideos: [],
  });

  return true;
}
