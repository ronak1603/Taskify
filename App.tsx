import React, {Fragment} from 'react';
import Toast from 'react-native-toast-message';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {NavigationContainer, ThemeProvider} from '@react-navigation/native';

import {RootStackNavigator} from './src/utils/navigators';
import LoginScreen from './src/screens/login';
import {navigatorHeaderOptions} from './src/utils/constants';
import {useAppTheme} from './src/hooks/theme';
import RegisterScreen from './src/screens/register';

const queryClient = new QueryClient();

const Navigation = () => {
  const MyTheme = useAppTheme(); // Use the theme hook

  return (
    <NavigationContainer theme={MyTheme}>
      <RootStackNavigator.Navigator
        screenOptions={{
          ...navigatorHeaderOptions,
        }}>
        <Fragment>
          <RootStackNavigator.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStackNavigator.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
        </Fragment>
      </RootStackNavigator.Navigator>
    </NavigationContainer>
  );
};

function App() {
  const theme = useAppTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={theme}>
        <Navigation />
        <Toast position="bottom" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
