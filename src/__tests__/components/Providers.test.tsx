import { render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'

import { Providers } from '../../components/Providers'

const mockHapticProviderCalls: unknown[] = []
jest.mock('@rific/auto-paper', () => ({
  Provider: (props: any) => props.children,
  themeActions: { initialize: (payload: unknown) => ({ payload, type: 'theme/initialize' }) },
  themeReducer: (state = { appearance: 'auto', blur: true, color: '#4caf50', harmony: 'split-complementary' }) => state
}))

jest.mock('@rific/haptic-press', () => ({
  hapticActions: { initialize: (payload: unknown) => ({ payload, type: 'haptic/initialize' }) },
  HapticPressProvider: (props: any) => {
    mockHapticProviderCalls.push(props)
    return props.children
  },
  hapticReducer: (state = { vibrate: true }) => state
}))

jest.mock('@rific/toaster', () => ({
  HistoryModal: () => null,
  Toaster: () => null,
  ToastProvider: (props: any) => props.children
}))

jest.mock('../../utils/splashGate', () => ({
  markSplashReady: jest.fn(),
  useSplashReady: jest.fn()
}))

beforeEach(() => {
  mockHapticProviderCalls.length = 0
})

describe('Providers', () => {
  it('renders without crashing', async () => {
    await expect(
      render(
        <Providers>
          <Text>test</Text>
        </Providers>
      )
    ).resolves.toBeDefined()
  })

  it('renders children', async () => {
    const { getByText } = await render(
      <Providers>
        <Text>app content</Text>
      </Providers>
    )
    expect(getByText('app content')).toBeTruthy()
  })

  it('passes vibrate=true (default) to HapticPressProvider', async () => {
    await render(
      <Providers>
        <Text>child</Text>
      </Providers>
    )
    expect(mockHapticProviderCalls.length).toBeGreaterThan(0)
    expect(mockHapticProviderCalls[0]).toEqual(expect.objectContaining({ initialValue: expect.objectContaining({ vibrate: true }) }))
  })
})
