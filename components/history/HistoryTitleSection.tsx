import { StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import Typography from '@/constants/Typography';
import { vs } from 'react-native-size-matters';

interface Props {
  title: string;
}

export default function HistoryTitleSection({ title }: Props) {
  return <ThemedText style={styles.title}>{title}</ThemedText>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: Typography.xl,
    fontWeight: '600',
    marginVertical: vs(14),
  },
});
