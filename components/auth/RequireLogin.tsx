import useUserStore from '@/store/useUserStore';
import { usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';

export function RequireLogin({ children }: { children: React.ReactNode }) {
  const user = useUserStore(state => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      router.replace({ pathname: '/login', params: { fromRedirect: 'true' } });
    }
  }, [user]);

  return <>{children}</>;
}
