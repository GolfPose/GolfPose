import { useTheme } from '@/hooks/useTheme';

export function getColor(lightColor: string, darkColor: string) {
  const theme = useTheme();
  return theme === 'dark' ? darkColor : lightColor;
}
