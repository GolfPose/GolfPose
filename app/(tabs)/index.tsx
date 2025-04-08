import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import TitleSection from '@/components/home/TitleSection';
import UploadBox from '@/components/home/UploadBox';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Header showUserInfo />
      <ThemedView style={styles.contents}>
        <TitleSection />
        <UploadBox />
        {/* <GolfImage /> */}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contents: { flex: 1 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
