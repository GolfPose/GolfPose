import * as SecureStore from 'expo-secure-store';
import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/useUserStore';

export async function login(email: string, password: string) {
  const { setUser } = useUserStore.getState();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    throw new Error(error?.message || '로그인 실패');
  }

  const { user, access_token, refresh_token } = data.session;

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

  await SecureStore.setItemAsync('access_token', access_token);
  await SecureStore.setItemAsync('refresh_token', refresh_token);

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
