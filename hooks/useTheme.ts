import { useColorScheme } from 'react-native';
import { useThemeStore } from '@/store/useThemeStore';

export function useTheme() {
  const systemTheme = useColorScheme();
  const mode = useThemeStore(state => state.mode);

  if (mode === 'system') {
    return systemTheme ?? 'light';
  }
  return mode;
}
