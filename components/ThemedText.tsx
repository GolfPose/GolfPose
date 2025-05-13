import { Text, TextProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedText = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedTextProps) => {
  const theme = useTheme();
  const color =
    theme === 'dark'
      ? (darkColor ?? Colors.dark.text)
      : (lightColor ?? Colors.light.text);

  return <Text allowFontScaling={false} style={[style, { color }]} {...otherProps} />;
};
