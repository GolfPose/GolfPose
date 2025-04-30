export function getColor(
  theme: 'light' | 'dark',
  colors: Record<'light' | 'dark', string>,
): string {
  return colors[theme];
}
