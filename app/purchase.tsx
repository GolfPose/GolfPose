import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Pressable, Image, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { s, vs } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { getColor } from '@/utils/getColor';
import { FontAwesome } from '@expo/vector-icons';
import { Bootpay, Extra } from 'react-native-bootpay-api';
import React, { useRef } from 'react';

export default function PurchaseScreen() {
  const { title, price } = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const iconColor = getColor(theme, {
    light: Colors.common.black,
    dark: Colors.common.white,
  });
  const bootpayRef = useRef<Bootpay>(null);

  // 결제 요청 핸들러
  const handlePayment = () => {
    const orderId = `order_${Date.now()}`;
    const payload = {
      pg: 'inicis',             // PG사
      method: 'card',           // 결제수단
      order_name: title,        // 상품명
      order_id: orderId,        // 고유 주문번호
      price: Number(price),     // 결제금액
    };
    const items = [
      {
        name: title,
        qty: 1,
        id: orderId,
        price: Number(price),
      },
    ];
    const user = {
      id: 'user_1234',
      username: '홍길동',
      email: 'user@example.com',
      gender: 0,
      birth: '1990-01-01',
      phone: '01012345678',
      area: '서울',
      addr: '서울시 강남구',
    };
    const extra: Extra = {
      app_scheme: 'yourAppScheme',
      show_close_button: false,
    };

    bootpayRef.current?.requestPayment(payload, items, user, extra);
  };

  // 이벤트 핸들러
  const onCancel = (data: any) => console.log('결제취소', data);
  const onError = (data: any) => console.log('결제에러', data);
  const onReady = (data: any) => console.log('준비완료', data);
  const onConfirm = (data: any) => {
    console.log('결제확인요청', data);
    // 서버 검증 후 승인 콜
    bootpayRef.current?.transactionConfirm(data);
  };
  const onDone = (data: any) => console.log('결제완료', data);
  const onClose = () => console.log('웹뷰닫힘');

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
        <View style={styles.priceRow}>
          <ThemedText style={styles.paymentLabel}>결제금액</ThemedText>
          <ThemedText style={styles.modalPrice}>{price}원</ThemedText>
        </View>
      </ThemedView>

      <ThemedText style={styles.sectionTitle}>일반결제</ThemedText>
      <Pressable style={styles.paymentOption} onPress={handlePayment}>
        <FontAwesome name="credit-card" size={24} color={iconColor} style={{ marginRight: 12 }} />
        <ThemedText style={styles.paymentText}>신용카드로 결제</ThemedText>
      </Pressable>

      <ThemedText style={styles.sectionTitle}>간편결제</ThemedText>
      <ThemedView style={styles.quickRow}>
        <Pressable style={styles.quickOption} onPress={() => { /* 카카오페이 로직 */ }}>
          <Image source={require('@/assets/images/kakao.png')} style={styles.icon} resizeMode="contain" />
          <ThemedText style={styles.paymentText}>카카오페이</ThemedText>
        </Pressable>
        <Pressable style={styles.quickOption} onPress={() => { /* 네이버페이 로직 */ }}>
          <Image source={require('@/assets/images/naver.png')} style={styles.icon} resizeMode="contain" />
          <ThemedText style={styles.paymentText}>네이버페이</ThemedText>
        </Pressable>
      </ThemedView>

      {/* Bootpay 컴포넌트 삽입 */}
      <Bootpay
        ref={bootpayRef}
        ios_application_id="670df99dcc5274a3ac3fc42b"
        android_application_id="670df99dcc5274a3ac3fc42a"
        onCancel={onCancel}
        onError={onError}
        onReady={onReady}
        onConfirm={onConfirm}
        onDone={onDone}
        onClose={onClose}
      />
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
  planTitle: {
    fontSize: Typography.lg,
    fontWeight: '600',
    marginTop: vs(6),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: vs(4),
  },
  paymentLabel: {
    fontSize: Typography.md,
    color: Colors.common.gray600,
  },
  modalPrice: {
    fontSize: Typography.xl,
    fontWeight: 'bold',
    color: Colors.common.primary500,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: Typography.md,
    fontWeight: '600',
    marginTop: vs(12),
    marginBottom: vs(8),
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
});
