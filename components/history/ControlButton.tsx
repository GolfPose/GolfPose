import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '../ThemedView';
import { useTheme } from '@/hooks/useTheme';
import Typography from '@/constants/Typography';
import { s, vs } from 'react-native-size-matters';
import { getColor } from '@/utils/getColor';

interface Props {
  selected: string | null;
  onPress: (action: string) => void;
}

const BUTTONS = [
  {
    label: '동시재생',
    action: 'play',
    iconName: 'play',
    bg: { light: Colors.common.primary500, dark: Colors.common.primary500 },
    fg: { light: Colors.common.white, dark: Colors.common.white },
    border: { light: Colors.common.primary500, dark: Colors.common.primary500 },
  },
  {
    label: '동시정지',
    action: 'pause',
    iconName: 'pause',
    bg: { light: Colors.common.black, dark: Colors.common.black },
    fg: { light: Colors.common.white, dark: Colors.common.white },
    border: { light: Colors.common.black, dark: Colors.common.white },
  },
  {
    label: '초기화',
    action: 'reset',
    iconName: 'rotate-ccw',
    bg: { light: Colors.common.black, dark: Colors.common.black },
    fg: { light: Colors.common.white, dark: Colors.common.white },
    border: { light: Colors.common.black, dark: Colors.common.white },
  },
  {
    label: '분석결과',
    action: 'analysis',
    iconName: 'book-open',
    bg: { light: Colors.common.white, dark: Colors.common.black },
    fg: { light: Colors.common.black, dark: Colors.common.white },
    border: { light: Colors.common.gray600, dark: Colors.common.white },
  },
];

export default function ControlButtonGroup({ onPress }: Props) {
  const theme = useTheme();

  return (
    <ThemedView style={styles.row}>
      {BUTTONS.map(({ action, label, iconName, bg, fg, border }) => {
        const bgColor = getColor(theme, bg);
        const fgColor = getColor(theme, fg);
        const borderColor = getColor(theme, border);

        return (
          <Pressable
            key={action}
            onPress={() => onPress(action)}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: bgColor,
                borderColor,
                borderWidth: 1,
                opacity: pressed ? 0.6 : 1,
              },
            ]}
          >
            <Feather
              name={iconName as any}
              size={s(14)}
              color={fgColor}
              style={styles.icon}
            />
            <ThemedText style={[styles.text, { color: fgColor }]}>
              {label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(16),
  },
  button: {
    flex: 1,
    marginHorizontal: s(4),
    paddingVertical: vs(8),
    paddingHorizontal: s(6),
    borderRadius: s(6),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: Typography.sm,
  },
  icon: {
    marginRight: s(4),
  },
});
