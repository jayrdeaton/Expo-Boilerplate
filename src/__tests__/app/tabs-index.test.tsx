import { render } from '@testing-library/react-native'
import React from 'react'

import HomeScreen from '../../app/(tabs)/index'

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useRouter: () => ({ back: jest.fn(), push: jest.fn() })
}))

describe('HomeScreen', () => {
  it('renders without crashing', async () => {
    await expect(render(<HomeScreen />)).resolves.toBeDefined()
  })

  it('displays the Expo Starter header', async () => {
    const { getByText } = await render(<HomeScreen />)
    expect(getByText('Expo Starter')).toBeTruthy()
  })
})
