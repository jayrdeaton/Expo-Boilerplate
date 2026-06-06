import React from 'react'
import { Text } from 'react-native'
import { render } from '@testing-library/react-native'

const mockHapticProviderCalls: unknown[] = []
jest.mock('@rific/auto-paper', () => ({
  createThemeReducer: () =>
    (state = { appearance: 'auto', color: '#4caf50' }) =>
      state,
  Provider: (props: any) => props.children,
}))

jest.mock('@rific/haptic-press', () => ({
  HapticPressProvider: (props: any) => {
    mockHapticProviderCalls.push(props)
    return props.children
  },
}))

jest.mock('@rific/toaster', () => ({
  Toaster: () => null,
  ToastProvider: (props: any) => props.children,
}))

jest.mock('../../utils/splashGate', () => ({
  addGate: jest.fn(),
  clearGate: jest.fn(),
}))

import { Providers } from '../../components/Providers'

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
    expect(mockHapticProviderCalls[0]).toEqual(
      expect.objectContaining({ enabled: true })
    )
  })
})
