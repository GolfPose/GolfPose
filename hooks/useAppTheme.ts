import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export function useAppTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = Colors[colorScheme ?? "light"];

  return {
    isDark,
    colorScheme,
    colors,
    // 추후 테마 변경 기능을 추가할 수 있는 공간
    // setTheme: (theme: 'light' | 'dark') => { ... }
  };
}
