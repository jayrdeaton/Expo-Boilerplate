import * as SplashScreen from 'expo-splash-screen'

const gates = new Set<string>()

const tryHide = () => {
  if (gates.size === 0) void SplashScreen.hideAsync()
}

export const addGate = (key: string) => {
  gates.add(key)
}

export const clearGate = (key: string) => {
  gates.delete(key)
  tryHide()
}
