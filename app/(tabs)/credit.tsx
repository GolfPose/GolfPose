import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { RequireLogin } from '@/components/auth/RequireLogin';
import Header from '@/components/Header';
import TitleSection from '@/components/TitleSection';
import { s, vs } from 'react-native-size-matters';
import PlanBox from '@/components/credit/PlanBox';
import { Plans } from '@/constants/Plans';
import { ScrollView } from 'react-native';

export default function CreditScreen() {
  return (
    <RequireLogin>
      <ThemedView style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Header />
          <ThemedView style={styles.container}>
            <TitleSection title="크레딧 구매" />
            <ThemedView style={styles.innerContainer}>
              <PlanBox {...Plans.basic} />
              <PlanBox {...Plans.premium} />
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </RequireLogin>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: vs(80),
  },
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: s(24),
  },
  innerContainer: {
    marginTop: vs(16),
    gap: vs(16),
  },
});
