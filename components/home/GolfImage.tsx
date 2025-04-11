import { Image, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { vs } from 'react-native-size-matters';

export default function GolfImage() {
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('../../assets/images/swing.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: vs(280),
  },
});
