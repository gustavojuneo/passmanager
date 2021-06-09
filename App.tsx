import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';

import theme from './src/global/styles/theme';
import { StorageProvider } from './src/contexts/StorageContext';
import { AppRoutes } from './src/routes/app.routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StorageProvider>
          <AppRoutes />
        </StorageProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
