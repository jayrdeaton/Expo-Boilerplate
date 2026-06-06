import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useUpdater } from '@rific/updater'

import { Providers } from '@/components/Providers'

SplashScreen.preventAutoHideAsync()
SplashScreen.setOptions({ duration: 500, fade: true })

const RootNavigator = () => {
  return (
    <Stack>
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
