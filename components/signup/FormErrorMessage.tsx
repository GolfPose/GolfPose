import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import Typography from '@/constants/Typography';
import { s, vs } from 'react-native-size-matters';

interface FormErrorMessageProps {
  message?: string | null;
}

export const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  if (!message) return null;
  return <ThemedText style={styles.errorText}>{message}</ThemedText>;
};

const styles = StyleSheet.create({
      errorText: {
        color: Colors.common.red,
        fontSize: Typography.sm,
        marginTop: vs(4),
        paddingLeft: s(4),
      },
  });