// hooks/useTheme.ts
import { useColorScheme } from 'react-native';
import { useThemeStore } from '@/store/useThemeStore';

export function useTheme(): 'light' | 'dark' {
  const mode = useThemeStore(state => state.mode);
  const systemScheme = useColorScheme();

  if (mode === 'system') {
    return systemScheme ?? 'light';
  }

  return mode;
}
