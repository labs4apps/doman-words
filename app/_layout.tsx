import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SettingsProvider, useSettings } from '@/providers/settingsProvider';
import { useColorScheme } from '@/hooks/useColorScheme';
import i18n from '@/src/i18n';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { t } = useTranslation();
  const { language } = useSettings();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <ThemeProvider value={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="settings" options={{ title: t('settings') }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: '' }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="level" options={{ headerTitle: '' }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
