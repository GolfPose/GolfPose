import { Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { s, vs } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';

type BackHeaderProps = {
  theme: 'light' | 'dark';
};

export default function BackHeader({ theme }: BackHeaderProps) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  const iconColor =
    theme === 'dark' ? Colors.common.white : Colors.common.black;

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="chevron-back" size={32} color={theme} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: vs(16),
  },
  backButton: {
    width: s(40),
    height: vs(40),
    justifyContent: 'center',
    marginLeft: s(16),
  },
});
