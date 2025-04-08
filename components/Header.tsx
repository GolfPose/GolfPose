import useUserStore from '@/store/useUserStore';
import { ThemedView } from './ThemedView';
import { Image, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

interface HeaderProps {
  showUserInfo?: boolean;
}

export default function Header({ showUserInfo = false }: HeaderProps) {
  const user = useUserStore(state => state.user);
  const isLoggedIn = user?.isLoggedIn;
  const nickname = user?.name ?? '';

  const onPress = () => {
    console.log('로그인 페이지로 이동');
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {showUserInfo &&
        (isLoggedIn ? (
          <ThemedText style={styles.text}>{nickname}</ThemedText>
        ) : (
          <Pressable onPress={onPress}>
            <ThemedText style={styles.text}>로그인</ThemedText>
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
    width: 100,
    height: 30,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});
