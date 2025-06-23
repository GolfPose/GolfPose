import React, { useRef, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';

export default function PurchaseScreen() {
  const webViewRef = useRef<WebView | null>(null);
  const router = useRouter();

  const rawParams = useLocalSearchParams();
  const title = Array.isArray(rawParams.title)
    ? (rawParams.title[0] || '상품명').toString()
    : (rawParams.title || '상품명').toString();

  let rawPriceString: string;
  if (Array.isArray(rawParams.price)) {
    rawPriceString = rawParams.price[0] || '0';
  } else {
    rawPriceString = rawParams.price || '0';
  }

  const cleanPriceString = rawPriceString.replace(/,/g, '');
  const parsedPrice = parseInt(cleanPriceString, 10);
  const finalPrice = isNaN(parsedPrice) || parsedPrice < 100 ? 0 : parsedPrice;

  console.log('--- PurchaseScreen Params Processing ---');
  console.log('rawParams.title:', rawParams.title);
  console.log('title (processed):', title);
  console.log('rawParams.price:', rawParams.price);
  console.log('cleanPriceString:', cleanPriceString);
  console.log('parsedPrice:', parsedPrice);
  console.log('finalPrice (used for Bootpay):', finalPrice);
  console.log('------------------------------------');

  const [isLoading, setIsLoading] = useState(true);

  const BOOTPAY_HTML_URL =
    'https://bootpay-karmesin924s-projects.vercel.app/bootpay.html';
  const fullHtmlUrl = `${BOOTPAY_HTML_URL}?title=${encodeURIComponent(title)}&price=${encodeURIComponent(finalPrice.toString())}`;

  console.log('WebView URL:', fullHtmlUrl);

  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      console.log('[Bootpay WebView Message]', message);

      switch (message.type) {
        case 'webReady':
          setIsLoading(false);
          webViewRef.current?.postMessage(
            JSON.stringify({ type: 'startPayment' }),
          );
          break;
        case 'done':
          Alert.alert(
            '결제 성공',
            `결제 정보: ${JSON.stringify(message.data, null, 2)}`,
            [{ text: '확인', onPress: () => router.replace('/') }],
          );
          break;
        case 'cancel':
          console.log('결제 취소됨:', message.data);
          router.replace('/credit');
          break;
        case 'error':
          Alert.alert(
            '결제 오류',
            `오류 정보: ${JSON.stringify(message.data, null, 2)}`,
            [{ text: '확인', onPress: () => router.back() }],
          );
          break;
        default:
          console.log('알 수 없는 웹뷰 메시지:', message);
      }
    } catch (error) {
      console.error('WebView 메시지 파싱 오류:', error);
      Alert.alert(
        '처리 오류',
        '웹뷰에서 메시지를 처리하는 중 오류가 발생했습니다.',
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>결제 페이지 로딩 중입니다...</Text>
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: fullHtmlUrl }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        originWhitelist={['*']}
        onError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView 오류: ', nativeEvent);
          Alert.alert(
            'WebView 오류',
            `코드: ${nativeEvent.code}\n설명: ${nativeEvent.description}`,
          );
          setIsLoading(false);
        }}
        onLoadStart={() => {
          setIsLoading(true);
          console.log('WebView Load Start');
        }}
        onLoadEnd={syntheticEvent => {
          console.log('WebView Load End', syntheticEvent.nativeEvent.url);
        }}
        style={styles.webView}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});
