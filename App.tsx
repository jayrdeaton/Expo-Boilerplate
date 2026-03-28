import 'react-native-gesture-handler'
import React from 'react'
import { enableScreens } from 'react-native-screens'
import { Providers } from './src/components'
import Navigation from './src/navigation'

enableScreens(true)

const MainApp: React.FC = () => (
  <Providers>
    <Navigation />
  </Providers>
)

export default function App() {
  return <MainApp />
}
