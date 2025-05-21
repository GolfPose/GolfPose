import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Pressable, Image, View, Text, useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { s, vs } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { getColor } from '@/utils/getColor';
import { FontAwesome } from '@expo/vector-icons';

export default function PurchaseScreen() {
  const { title, price } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const theme = useTheme();
  const iconColor = getColor(theme, {
    light: Colors.common.black,
    dark: Colors.common.white,
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.modalHeader}>
        <ThemedText style={styles.modalTitle}>결제수단 선택</ThemedText>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Feather name="x" size={s(20)} color={iconColor} />
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.summaryBox}>
        <ThemedText style={styles.company}>주식회사 자이스웍스</ThemedText>
        <ThemedText style={styles.planTitle}>{title}</ThemedText>
        <ThemedView style={styles.priceRow}>
          <ThemedText style={styles.paymentLabel}>결제금액</ThemedText>
          <ThemedText style={styles.modalPrice}>{price}원</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedText style={styles.sectionTitle}>일반결제</ThemedText>
      <Pressable style={styles.paymentOption}>
        <FontAwesome name="credit-card" size={24} color= {iconColor} style={{ marginRight: 12 }} />
        <ThemedText style={styles.paymentText}>신용카드</ThemedText>
      </Pressable>

      <ThemedText style={styles.sectionTitle}>간편결제</ThemedText>
      <ThemedView style={styles.quickRow}>
        <Pressable style={styles.quickOption}>
          <Image source={require('@/assets/images/kakao.png')} style={styles.icon} resizeMode="contain" />
          <ThemedText style={styles.paymentText}>카카오페이</ThemedText>
        </Pressable>
        <Pressable style={styles.quickOption}>
          <Image source={require('@/assets/images/Naver.png')} style={styles.icon} resizeMode="contain" />
          <ThemedText style={styles.paymentText}>네이버페이</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: s(20),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(16),
    marginTop: vs(12),
    marginBottom: vs(16),
    position: 'relative',
    height: vs(40),
  },
  modalTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    marginBottom: vs(16),
    alignSelf: 'center',
  },
  summaryBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: s(12),
    borderRadius: s(8),
    borderWidth: 1,
    width: s(302),
    borderColor: Colors.common.gray300,
    marginTop: vs(8),
    marginBottom: vs(16),
  },
  company: {
    fontSize: Typography.sm,
    color: Colors.common.gray600,
  },
  amountLabel: {
    fontSize: Typography.sm,
    color: Colors.common.gray600,
    marginTop: vs(4),
  },
  planTitle: {
    fontSize: Typography.md,
    fontWeight: '600',
    marginTop: vs(4),
  },
  modalPrice: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
    color: Colors.common.primary500,
    textAlign: 'right',
    marginTop: vs(4),
  },
  sectionTitle: {
    fontSize: Typography.md,
    fontWeight: '600',
    marginTop: vs(12),
    marginBottom: vs(4),
  },
  paymentOption: {
    width: s(146),
    flexDirection: 'row',
    alignItems: 'center',
    padding: s(12),
    borderWidth: 1,
    borderColor: Colors.common.gray300,
    borderRadius: s(8),
    marginBottom: vs(8),
    marginRight: s(8),
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: s(12),
    borderWidth: 1,
    borderColor: Colors.common.gray300,
    borderRadius: s(8),
    marginRight: s(8),

  },
  icon: {
    width: s(24),
    height: s(24),
    marginRight: s(12),
  },
  paymentText: {
    fontSize: Typography.md,
  },
  closeButton: {
    position: 'absolute',
    right: s(10),
    top: vs(10),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: s(8),
    width: s(280),
    borderColor: Colors.common.gray300,
  },
  paymentLabel: {
    fontSize: Typography.sm,
    color: Colors.common.gray600,
  },

});
