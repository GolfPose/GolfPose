import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { s, vs } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';
import Typography from '@/constants/Typography';

interface MyPageSectionProps {
  title: string;
  children: React.ReactNode;
}

export const MyPageSection = ({ title, children }: MyPageSectionProps) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: vs(12),
    padding: s(16),
    borderWidth: 1,
    borderColor: Colors.common.gray400,
    borderRadius: s(8),
  },
  title: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    marginVertical: vs(5),
  },
});
