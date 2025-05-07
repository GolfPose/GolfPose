import { StyleSheet, Pressable, Linking } from 'react-native';
import { ThemedView } from '../ThemedView';
import Typography from '@/constants/Typography';
import { s, vs } from 'react-native-size-matters';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';

interface PlanBoxProps {
  title: string;
  originalPrice?: string;
  discountLabel?: string;
  price: string;
  creditAmount: string;
  features: string[];
}

export default function PlanBox({
  title,
  originalPrice,
  discountLabel,
  price,
  creditAmount,
  features,
}: PlanBoxProps) {
  const handlePurchase = () => {
    const url = 'https://www.jaisworks.com/plans';
    Linking.openURL(url).catch(err => console.error('링크 열기 실패:', err));
  };

  return (
    <ThemedView style={styles.planBox}>
      <ThemedText style={styles.planTitle}>{title}</ThemedText>
      <ThemedView style={styles.discountContainer}>
        {originalPrice && (
          <ThemedText style={styles.originalPrice}>
            {originalPrice}원
          </ThemedText>
        )}
        {!!discountLabel && (
          <ThemedText style={styles.discountLabel}>{discountLabel}</ThemedText>
        )}
      </ThemedView>
      <ThemedText style={styles.price}>{price}원</ThemedText>
      <ThemedText style={styles.credit}>{creditAmount}</ThemedText>
      <Pressable style={styles.button} onPress={handlePurchase}>
        <ThemedText style={styles.buttonText}>결제하기</ThemedText>
      </Pressable>
      {features.map((feature, idx) => (
        <ThemedView key={idx} style={styles.featureRow}>
          <Feather
            name="check"
            size={16}
            color={Colors.common.primary500}
            style={{ marginRight: s(8) }}
          />
          <ThemedText style={styles.featureText}>{feature}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  planBox: {
    borderWidth: 1,
    borderRadius: s(12),
    paddingHorizontal: s(16),
    paddingVertical: vs(16),
    borderColor: Colors.common.gray200,
  },
  planTitle: {
    fontSize: Typography.xl,
    fontWeight: '700',
    marginBottom: vs(4),
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
    marginTop: vs(4),
  },
  originalPrice: {
    fontSize: Typography.sm,
    color: Colors.common.gray500,
    textDecorationLine: 'line-through',
  },
  discountLabel: {
    fontSize: Typography.sm,
    color: Colors.common.primary700,
    fontWeight: '800',
  },
  price: {
    fontSize: Typography['3xl'],
    fontWeight: '800',
    marginVertical: vs(8),
  },
  credit: {
    fontSize: Typography.md,
    marginTop: vs(4),
  },
  button: {
    backgroundColor: Colors.common.primary500,
    paddingVertical: vs(10),
    borderRadius: s(8),
    alignItems: 'center',
    marginVertical: vs(16),
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: Typography.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(4),
  },
  featureText: {
    fontSize: Typography.md,
    marginVertical: vs(3),
  },
});
