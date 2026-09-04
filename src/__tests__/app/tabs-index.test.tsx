import { FeedbackPressProvider } from '@rific/feedback-press'
import { render } from '@testing-library/react-native'
import * as RNPaper from 'react-native-paper'

import HomeScreen from '../../app/(tabs)/index'

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useRouter: () => ({ back: jest.fn(), push: jest.fn() })
}))

// react-native-paper is no longer auto-detected via require() inside @rific/feedback-press's
// <Button> - it must be injected via <FeedbackPressProvider paper={...}>, matching how the real
// app wires it in src/components/Providers.tsx.
const renderHomeScreen = () =>
  render(
    <FeedbackPressProvider paper={RNPaper as unknown as Parameters<typeof FeedbackPressProvider>[0]['paper']}>
      <HomeScreen />
    </FeedbackPressProvider>
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
