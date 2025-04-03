import { useThemeColor } from "@/hooks/useThemeColor";
import { Text, TextProps } from "react-native";

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
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <Text style={[{ color }, style]} {...otherProps} />;
};
