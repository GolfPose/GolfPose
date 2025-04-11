import { ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header';
import UploadBox from '@/components/home/UploadBox';
import GolfImage from '@/components/home/GolfImage';
import Typography from '@/constants/Typography';
import HomeTitleSection from '@/components/home/HomeTitleSection';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Header showUserInfo />
      <ScrollView contentContainerStyle={styles.contents}>
        <ThemedView style={styles.contents}>
          <HomeTitleSection />
          <UploadBox />
          <GolfImage />
        </ThemedView>
      </ScrollView>
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
    fontSize: Typography.xl,
    fontWeight: 'bold',
  },
});
