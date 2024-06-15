import {useColorScheme} from 'react-native';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

export const useAppTheme = () => {
  const scheme = useColorScheme();
  console.log('theme', scheme);
  return scheme === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;
};
