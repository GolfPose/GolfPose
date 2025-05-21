import { ThemeColorMap } from '@/types/ThemeColorMap';

export function getColor(
  theme: 'light' | 'dark',
  colorMap: ThemeColorMap,
): string {
  return theme === 'dark' ? colorMap.dark : colorMap.light;
}
