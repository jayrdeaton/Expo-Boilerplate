import { useUpdater } from '@rific/updater'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useTheme } from 'react-native-paper'

import { Providers } from '@/components/Providers'

SplashScreen.preventAutoHideAsync()
SplashScreen.setOptions({ duration: 500, fade: true })

const RootNavigator = () => {
  const theme = useTheme()
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.onSurface,
        statusBarColor: theme.colors.surface,
        statusBarStyle: theme.dark ? 'light' : 'dark'
      }}
    >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  )
}

const RootLayout = () => {
  useUpdater()

  return (
    <Providers>
      <RootNavigator />
    </Providers>
  )
}

export default RootLayout
