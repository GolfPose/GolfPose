import useUserStore from '@/store/useUserStore';
import { ThemedView } from './ThemedView';
import { Image, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from './ThemedText';
import { Link } from 'expo-router';
import Typography from '@/constants/Typography';

interface HeaderProps {
  showUserInfo?: boolean;
}

export default function Header({ showUserInfo = false }: HeaderProps) {
  const user = useUserStore(state => state.user);
  const isLoggedIn = user?.isLoggedIn;
  const nickname = user?.name ?? '';
  const colorScheme = useColorScheme();

  const onPress = () => {
    console.log('로그인 페이지로 이동');
  };

  const logoSource =
    colorScheme === 'dark'
      ? require('../assets/images/logo.png')
      : require('../assets/images/white-logo.png');

  return (
    <ThemedView style={styles.container}>
      <Image source={logoSource} style={styles.logo} resizeMode="contain" />
      {showUserInfo &&
        (isLoggedIn ? (
          <ThemedText style={styles.text}>{nickname}</ThemedText>
        ) : (
          <Pressable onPress={onPress}>
            <Link href={'/login'}>
              <ThemedText style={styles.text}>로그인</ThemedText>
            </Link>
          </Pressable>
        ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 40,
  },
  text: {
    fontSize: Typography.lg,
    fontWeight: '500',
  },
});
