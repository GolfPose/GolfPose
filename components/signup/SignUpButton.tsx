import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { s, vs } from 'react-native-size-matters';
import Typography from '@/constants/Typography';

interface Props {
  onPress: () => void;
  disabled: boolean;
}

export const SignUpButton = ({ onPress, disabled }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <ThemedText style={styles.buttonText}>회원가입</ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    button: {
        borderColor: Colors.common.primary500,
        backgroundColor: Colors.common.primary500,
        borderWidth: 1,
        paddingVertical: vs(12),
        borderRadius: s(8),
        marginTop: vs(12),
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonDisabled: {
        borderColor: Colors.common.gray300,
        backgroundColor: Colors.common.gray300,
      },
      buttonPressed: {
        opacity: 0.85,
      },
      buttonText: {
        color: Colors.common.white,
        fontSize: Typography.md,
        fontWeight: 'bold',
        textAlign: 'center',
      },
  });