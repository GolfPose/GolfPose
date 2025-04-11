import { Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { s, vs } from 'react-native-size-matters';

export default function BackHeader() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="chevron-back" size={32} color="white" />
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
  },
  backButton: {
    width: s(40),
    height: vs(40),
    justifyContent: 'center',
    marginLeft: 16,
  },
});
