import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Pressable, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { s, vs } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { getColor } from '@/utils/getColor';
import { FontAwesome } from '@expo/vector-icons';
import Bootpay from 'react-native-bootpay';

export default function PurchaseScreen() {
  const { title, price } = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const iconColor = getColor(theme, {
    light: Colors.common.black,
    dark: Colors.common.white,
  });
  const handlePayment = () => {
    Bootpay.requestPayment({
      application_id: 'YOUR_BOOTPAY_APP_ID', // 👈 Bootpay에서 발급받은 앱 ID
      pg: 'kcp',
      method: 'card',
      name: String(title ?? '상품명 없음'),
      price: Number(price ?? 1000),
      order_id: 'ORDER_' + new Date().getTime(),
      user: {
        id: 'user_1234',
        username: '홍길동',
        email: 'test@example.com',
      },
      items: [
        {
          item_name: String(title ?? '상품'),
          qty: 1,
          unique: 'ITEM_' + new Date().getTime(),
          price: Number(price ?? 1000),
        },
      ],
    })
      .then((res: any) => {
        console.log('✅ 결제 성공:', res);
      })
      .catch((err: any) => {
        console.warn('❌ 결제 실패 또는 취소:', err);
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.modalHeader}>
        <ThemedText style={styles.modalTitle}>결제수단 선택</ThemedText>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Feather name="x" size={s(20)} color={iconColor} />
        </Pressable>
      </ThemedView>

      <Pressable style={styles.paymentButton} onPress={handlePayment}>
        <ThemedText style={styles.buttonText}>Bootpay 결제하기</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: s(20),
    backgroundColor: Colors.light.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(16),
  },
  modalTitle: {
    fontSize: Typography.lg,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: s(4),
  },
  paymentButton: {
    marginTop: vs(24),
    backgroundColor: Colors.common.primary500,
    paddingVertical: vs(12),
    borderRadius: s(6),
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.common.white,
    fontSize: Typography.md,
    fontWeight: 'bold',
  },
});