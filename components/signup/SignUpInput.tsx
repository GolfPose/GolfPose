import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Typography from '@/constants/Typography';
import { s, vs } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';
import { FormErrorMessage } from './FormErrorMessage';

interface SignUpInputProps extends TextInputProps {
  label: string;
  error?: string | null;
  theme?: 'light' | 'dark';
}

export const SignUpInput = ({
  label,
  error,
  theme = 'light',
  ...props
}: SignUpInputProps) => {
  return (
    <ThemedView>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        style={[
          styles.input,
          theme === 'dark' && styles.inputDark,
          error && styles.inputError,
        ]}
        placeholderTextColor="#999"
        autoCapitalize="none"
        textContentType="none"
        autoComplete="off"
        {...props}
      />
      <FormErrorMessage message={error} />
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
  inputDark: {
    backgroundColor: Colors.dark.background,
    borderColor: Colors.dark.gray500,
    borderWidth: 1,
    borderRadius: s(8),
    paddingHorizontal: s(16),
    paddingVertical: vs(10),
    marginBottom: vs(16),
    fontSize: Typography.md,
    color: Colors.dark.text,
  },
  inputError: {
    borderColor: Colors.common.red,
  },
});
