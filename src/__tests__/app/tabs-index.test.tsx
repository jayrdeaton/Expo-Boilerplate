import { HapticPressProvider } from '@rific/haptic-press'
import { render } from '@testing-library/react-native'
import React from 'react'
import * as RNPaper from 'react-native-paper'

import HomeScreen from '../../app/(tabs)/index'

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useRouter: () => ({ back: jest.fn(), push: jest.fn() })
}))

// react-native-paper is no longer auto-detected via require() inside @rific/haptic-press's
// <Button> - it must be injected via <HapticPressProvider paper={...}>, matching how the real
// app wires it in src/components/Providers.tsx.
const renderHomeScreen = () =>
  render(
    <HapticPressProvider paper={RNPaper as unknown as Parameters<typeof HapticPressProvider>[0]['paper']}>
      <HomeScreen />
    </HapticPressProvider>
  )

describe('HomeScreen', () => {
  it('renders without crashing', async () => {
    await expect(renderHomeScreen()).resolves.toBeDefined()
  })

  it('displays the Expo Starter header', async () => {
    const { getByText } = await renderHomeScreen()
    expect(getByText('Expo Starter')).toBeTruthy()
  })
})
