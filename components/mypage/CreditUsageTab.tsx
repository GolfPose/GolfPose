import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MyPageSection } from './MyPageSection';
import useUserStore from '@/store/useUserStore';
import { Colors } from '@/constants/Colors';
import { vs } from 'react-native-size-matters';
import dayjs from 'dayjs';
import Typography from '@/constants/Typography';

export const CreditUsageTab = () => {
  const user = useUserStore(state => state.user);
  const creditRecords = user?.creditRecord ?? [];

  return (
    <MyPageSection title="크레딧 사용내역">
      {creditRecords.map((record, idx) => (
        <ThemedView key={record.id}>
          <ThemedView style={styles.itemRow}>
            <ThemedView style={styles.textBlock}>
              <ThemedText style={styles.itemLabel}>
                {record.type === 'REFUND' ? '크레딧 환불' : '크레딧 사용'}
              </ThemedText>
              <ThemedText style={styles.itemDate}>
                {dayjs(record.date).format('YYYY.MM.DD A hh:mm:ss')}
              </ThemedText>
            </ThemedView>

            <ThemedText
              style={[
                styles.itemAmount,
                {
                  color:
                    record.change > 0 ? Colors.common.blue : Colors.common.red,
                  alignSelf: 'center',
                },
              ]}
            >
              {record.change > 0 ? `+${record.change}` : `${record.change}`}{' '}
              크레딧
            </ThemedText>
          </ThemedView>

          {idx !== creditRecords.length - 1 && (
            <ThemedView style={styles.divider} />
          )}
        </ThemedView>
      ))}
    </MyPageSection>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: vs(4),
  },
  withBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.common.gray400,
  },
  textBlock: {
    gap: vs(2),
  },
  itemLabel: {
    fontWeight: 'bold',
    fontSize: Typography.md,
  },
  itemDate: {
    fontSize: Typography.sm,
    color: Colors.common.gray600,
  },
  itemAmount: {
    fontSize: Typography.md,
    fontWeight: 'bold',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.common.gray400,
    marginTop: vs(10),
  },
});
