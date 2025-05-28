import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { supabase } from '@/lib/supabase';
import useUserStore from '@/store/useUserStore';

export function useRestoreSession() {
  const setUser = useUserStore.getState().setUser;
  const clearUser = useUserStore.getState().clearUser;

  useEffect(() => {
    const restore = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync('access_token');
        const refreshToken = await SecureStore.getItemAsync('refresh_token');

        if (!accessToken || !refreshToken) {
          console.log('토큰 없음, 세션 복원 스킵');
          clearUser();
          return;
        }

        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error || !data.session) {
          console.error('세션 복원 실패:', error?.message);
          clearUser();
          return;
        }

        const user = data.session.user;

        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('id, display_name, credits')
          .eq('uid', user.id)
          .single();

        if (profileError) {
          console.error('프로필 로드 실패:', profileError.message);
          clearUser();
          return;
        }

        setUser({
          id: profile.id,
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

        console.log('세션 복원 성공!');
      } catch (err) {
        console.error('세션 복원 중 예외 발생:', err);
        clearUser();
      }
    };

    restore();
  }, []);
}
