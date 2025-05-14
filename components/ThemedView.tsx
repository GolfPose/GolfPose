import { View, ViewProps } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';

interface ThemedViewProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
}

function ThemedViewBase({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const theme = useTheme();
  const backgroundColor =
    theme === 'dark'
      ? (darkColor ?? Colors.dark.background)
      : (lightColor ?? Colors.light.background);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const ThemedView = ThemedViewBase;
