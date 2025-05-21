import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { s, vs } from "react-native-size-matters";
import Typography from "@/constants/Typography";

interface Props {
  onPress: () => void;
}

export const SignUpNavigateButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.signupButton} onPress={onPress} activeOpacity={0.7}>
      <ThemedText style={styles.signupText}>회원가입</ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signupButton: {
    borderColor: Colors.common.primary500,
    borderWidth: 1,
    paddingVertical: vs(12),
    borderRadius: s(8),
    marginTop: vs(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    color: Colors.common.primary500,
    textAlign: 'center',
    fontSize: Typography.md,
    fontWeight: 'bold',
  },
});