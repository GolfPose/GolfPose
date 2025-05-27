import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { s, vs } from 'react-native-size-matters';
import Typography from '@/constants/Typography';

interface Props {
  onPress: () => void;
  loading: boolean;
}

export const LoginButton = ({ onPress, loading }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.loginButton,
        loading && styles.buttonLoading, // 로딩 중에만 회색 스타일
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={loading} // 로딩 중에만 비활성화
    >
      {loading ? (
        <ActivityIndicator color={Colors.common.white} />
      ) : (
        <ThemedText style={styles.loginText}>로그인</ThemedText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: Colors.common.primary500,
    paddingVertical: vs(12),
    borderRadius: s(8),
    marginTop: vs(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLoading: {
    backgroundColor: Colors.common.gray300,
  },
  loginText: {
    textAlign: 'center',
    fontSize: Typography.md,
    fontWeight: 'bold',
    color: Colors.common.white,
  },
});
