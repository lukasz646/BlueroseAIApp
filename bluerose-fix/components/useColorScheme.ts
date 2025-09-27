import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

export function useColorScheme(): NonNullable<ColorSchemeName> {
  const theme = _useColorScheme();
  return theme === 'dark' ? 'dark' : 'light';
}
