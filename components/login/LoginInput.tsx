import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { getColor } from "@/utils/getColor";
import { ThemedView } from "../ThemedView";
import Typography from "@/constants/Typography";
import { s, vs } from "react-native-size-matters";

interface LoginInputProps extends TextInputProps {
  label: string;
}

export const LoginInput = ({ label, ...props }: LoginInputProps) => {
  const theme = useTheme();

  return (
    <ThemedView>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        style={[
          styles.input,
          {
            color: getColor(theme, {
              light: Colors.common.black,
              dark: Colors.common.white,
            }),
            backgroundColor: getColor(theme, {
              light: Colors.common.white,
              dark: Colors.common.black,
            }),
          },
        ]}
        placeholderTextColor={getColor(theme, {
          light: Colors.common.gray600,
          dark: Colors.common.gray400,
        })}
        {...props}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: Typography.md,
    marginBottom: vs(10),
    marginTop: vs(10),
  },
  input: {
    borderColor: Colors.common.gray500,
    borderWidth: 1,
    borderRadius: s(8),
    paddingHorizontal: s(16),
    paddingVertical: vs(10),
    marginBottom: vs(16),
    fontSize: Typography.md,
  },
});