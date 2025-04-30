import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { MyPageSection } from './MyPageSection';

export const PaymentHistoryTab = () => {
  return (
    <MyPageSection title="결제내역">
      <ThemedView>
        <ThemedText>결제내역</ThemedText>
      </ThemedView>
    </MyPageSection>
  );
};
