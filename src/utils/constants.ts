import {generatedDarkScheme} from './color-scheme';

export const accessTokenKey = 'access_token';
export const DEBOUNCE_DELAY = 1000;

export const navigatorHeaderOptions = {
  headerTitleAlign: 'center' as 'center' | 'left',
  headerTitleStyle: {
    fontFamily: 'Karla-Regular',
  },
  headerStyle: {
    backgroundColor: generatedDarkScheme.colors.background,
  },
};
