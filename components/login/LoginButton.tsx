import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { s, vs } from "react-native-size-matters";
import Typography from "@/constants/Typography";

interface Props {
  onPress: () => void;
}

export const LoginButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.loginButton} onPress={onPress} activeOpacity={0.7}>
      <ThemedText style={styles.loginText}>로그인</ThemedText>
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
  loginText: {
    textAlign: 'center',
    fontSize: Typography.md,
    fontWeight: 'bold',
  },
});