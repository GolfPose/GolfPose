import { ThemeColorMap } from '@/types/themeColorMap';

export function getColor(
  theme: 'light' | 'dark',
  colorMap: ThemeColorMap,
): string {
  return theme === 'dark' ? colorMap.dark : colorMap.light;
}
