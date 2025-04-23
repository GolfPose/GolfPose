import { useThemeColor } from '@/hooks/useThemeColor';
import { View, ViewProps } from 'react-native';

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ViewProps & {
  lightColor?: string;
  darkColor?: string;
}) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
