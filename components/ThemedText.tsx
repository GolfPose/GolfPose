import { Text, TextProps, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  style?: TextStyle | TextStyle[];
};

export const ThemedText = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedTextProps) => {
  const theme = useTheme();
  const themeColor =
    theme === 'dark'
      ? (darkColor ?? Colors.dark.text)
      : (lightColor ?? Colors.light.text);

  return (
    <Text
      allowFontScaling={false}
      style={[{ color: themeColor }, style]}
      {...otherProps}
    />
  );
};
