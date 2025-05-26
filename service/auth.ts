import * as SecureStore from 'expo-secure-store';
import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/useUserStore';

// 로그인
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
    .select('display_name, credits')
    .eq('uid', user.id)
    .single();

  if (profileError) {
    throw new Error('프로필 정보를 가져오지 못했습니다.');
  }

  setUser({
    uid: user.id,
    name: profile.display_name,
    email: user.email!,
    plan: 'free',
    isLoggedIn: true,
    createdAt: user.created_at,
    credit: profile.credits || 0,
    creditRecord: [],
    myAnalysisVideos: [],
  });

  await SecureStore.setItemAsync('access_token', session.access_token);
  await SecureStore.setItemAsync('refresh_token', session.refresh_token);

  return true;
}

// 회원가입
export async function signUp(
  email: string,
  password: string,
  displayName: string,
) {
  const { data: emailCheck } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (emailCheck) {
    return { success: false, message: '이미 가입된 이메일입니다.' };
  }

  const {
    error,
    data: { user },
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.EXPO_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, message: error.message };
  }

  const { error: insertError } = await supabase.from('users').insert({
    email,
    display_name: displayName,
    uid: user?.id, // uuid
    credits: 80,
  });

  if (insertError) {
    console.error(insertError);
    return { success: false, message: '회원가입 중 오류가 발생했습니다.' };
  }

  return { success: true, message: '회원가입이 완료되었습니다.' };
}

// 로그아웃
export async function logout() {
  const { clearUser } = useUserStore.getState();

  await supabase.auth.signOut();
  await SecureStore.deleteItemAsync('access_token');
  await SecureStore.deleteItemAsync('refresh_token');
  clearUser();

  return true;
}

// 세션 복원
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
    .select('display_name, credits')
    .eq('uid', user.id)
    .single();

  if (profileError) {
    clearUser();
    return false;
  }

  setUser({
    uid: user.id,
    name: profile.display_name,
    email: user.email!,
    plan: 'free',
    isLoggedIn: true,
    createdAt: user.created_at,
    credit: profile.credits || 0,
    creditRecord: [],
    myAnalysisVideos: [],
  });

  return true;
}

// 닉네임 수정
export async function updateDisplayName(userUid: string, newName: string) {
  if (!newName.trim()) {
    return { success: false, message: '닉네임을 입력해주세요.' };
  }

  const currentUser = useUserStore.getState().user;
  if (!currentUser) {
    return { success: false, message: '사용자 정보가 없습니다.' };
  }

  if (newName === currentUser.name) {
    return { success: false, message: '현재 닉네임과 동일합니다.' };
  }

  const { data: existingName } = await supabase
    .from('users')
    .select('uid')
    .eq('display_name', newName)
    .single();

  if (existingName) {
    return { success: false, message: '이미 존재하는 닉네임입니다.' };
  }

  const { error: updateError } = await supabase
    .from('users')
    .update({ display_name: newName })
    .eq('uid', userUid);

  if (updateError) {
    console.error('닉네임 업데이트 실패:', updateError);
    return { success: false, message: '닉네임 업데이트에 실패했습니다.' };
  }

  const setUser = useUserStore.getState().setUser;
  setUser({
    ...currentUser,
    name: newName,
  });

  return { success: true, message: '닉네임이 성공적으로 변경되었습니다.' };
}
