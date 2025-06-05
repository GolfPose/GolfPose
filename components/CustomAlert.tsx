import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { getColor } from '@/utils/getColor';
import { ThemedText } from './ThemedText';

interface CustomAlertProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const CustomAlert = ({
  visible,
  message,
  onClose,
  confirmText = '확인',
  cancelText,
  onConfirm,
  onCancel,
}: CustomAlertProps) => {
  const theme = useTheme();

  const handleCancel = () => {
    onCancel ? onCancel() : onClose();
  };

  const handleConfirm = () => {
    onConfirm ? onConfirm() : onClose();
  };

  const backgroundColor = getColor(theme, {
    light: Colors.common.white,
    dark: Colors.darkModal,
  });

  const confirmTextColor = getColor(theme, {
    light: Colors.common.white,
    dark: Colors.common.black,
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.alertBox, { backgroundColor }]}>
          <ThemedText style={styles.title}>알림</ThemedText>
          <ThemedText style={styles.message}>{message}</ThemedText>

          <View style={styles.buttonRow}>
            {cancelText ? (
              <>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleCancel}
                >
                  <ThemedText
                    style={[styles.buttonText, styles.cancelButtonText]}
                  >
                    {cancelText}
                  </ThemedText>
                </Pressable>
                <Pressable style={styles.button} onPress={handleConfirm}>
                  <ThemedText
                    style={[styles.buttonText, { color: confirmTextColor }]}
                  >
                    {confirmText}
                  </ThemedText>
                </Pressable>
              </>
            ) : (
              <Pressable style={styles.button} onPress={handleConfirm}>
                <ThemedText
                  style={[styles.buttonText, { color: confirmTextColor }]}
                >
                  {confirmText}
                </ThemedText>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  alertBox: {
    width: '80%',
    padding: s(20),
    borderRadius: s(10),
    elevation: 5,
  },
  title: {
    fontSize: s(18),
    fontWeight: 'bold',
    marginBottom: vs(8),
  },
  message: {
    fontSize: s(16),
    marginBottom: vs(16),
    lineHeight: vs(22),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: s(8),
  },
  button: {
    paddingVertical: vs(8),
    paddingHorizontal: s(16),
    backgroundColor: Colors.common.primary500,
    borderRadius: s(6),
  },
  cancelButton: {
    backgroundColor: Colors.common.gray300,
  },
  buttonText: {
    fontSize: s(14),
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: Colors.common.black,
  },
});
