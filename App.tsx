import { ExpoRoot } from 'expo-router'

enableScreens(true)

export default function App() {
  // expo-router expects the app directory to be at src/app
  return <ExpoRoot appDir={require.resolve('./src/app')} />
}
