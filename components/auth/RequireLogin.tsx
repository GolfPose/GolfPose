import useUserStore from '@/store/useUserStore';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { CustomAlert } from '../CustomAlert';

export function RequireLogin({ children }: { children: React.ReactNode }) {
  const user = useUserStore(state => state.user);
  const router = useRouter();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [checkedLogin, setCheckedLogin] = useState(false);

  useEffect(() => {
    if (!checkedLogin) {
      setCheckedLogin(true); 

      if (!user || !user.isLoggedIn) {
        setAlertMessage('로그인이 필요한 서비스입니다.');
        setAlertVisible(true);
      }
    }
  }, [checkedLogin, user]);

  const handleAlertClose = () => {
    setAlertVisible(false);
    if (!user?.isLoggedIn) {
      router.replace({ pathname: '/login', params: { fromRedirect: 'true' } });
    }
  };

  if (!checkedLogin) return null;

  return (
    <>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={handleAlertClose}
        confirmText="확인"
      />
      {user?.isLoggedIn && children}
    </>
  );
}
