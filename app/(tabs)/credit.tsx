import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { RequireLogin } from '@/components/auth/RequireLogin';
import Header from '@/components/Header';
import TitleSection from '@/components/TitleSection';
import { s, vs } from 'react-native-size-matters';
import PlanBox from '@/components/credit/PlanBox';
import { Plans } from '@/constants/Plans';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function CreditScreen() {
  const router = useRouter();

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
              <PlanBox
                {...Plans.basic}
                onPress={() =>
                  router.push({
                    pathname: '/purchase',
                    params: {
                      title: Plans.basic.title,
                      price: Plans.basic.price.toString(),
                    },
                  })
                }
              />
              <PlanBox
                {...Plans.premium}
                onPress={() =>
                  router.push({
                    pathname: '/purchase',
                    params: {
                      title: Plans.premium.title,
                      price: Plans.premium.price.toString(),
                    },
                  })
                }
              />
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
