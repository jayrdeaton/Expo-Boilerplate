import { configureStore } from '@reduxjs/toolkit'
import { act, render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'
import { Provider as ReduxProvider } from 'react-redux'

import { Theme } from '../../components/Theme'
import settingsReducer from '../../redux/settingsSlice'
import { addGate, clearGate } from '../../utils/splashGate'

jest.mock('../../utils/splashGate', () => ({
  addGate: jest.fn(),
  clearGate: jest.fn()
}))

// Keep provider spy in module scope so the factory closure can reference it.
const mockProviderCalls: unknown[] = []
jest.mock('@rific/auto-paper', () => ({
  Provider: (props: any) => {
    mockProviderCalls.push(props)
    return props.children
  },
  themeActions: { initialize: (payload: unknown) => ({ payload, type: 'theme/initialize' }) }
}))

const mockAddGate = addGate as jest.Mock
const mockClearGate = clearGate as jest.Mock

const makeStore = (themeState: { appearance: 'light' | 'dark' | 'system'; color: string } = { appearance: 'light', color: '#4caf50' }) =>
  configureStore({
    reducer: {
      settings: settingsReducer,
      theme: (state = themeState) => state
    }
  })

// Capture the addGate('theme') call that happens at module load time
// before beforeEach clears all mocks.
let addGateCalledOnImport = false
beforeAll(() => {
  addGateCalledOnImport = mockAddGate.mock.calls.some(([k]) => k === 'theme')
})

beforeEach(() => {
  jest.clearAllMocks()
  mockProviderCalls.length = 0
})

describe('Theme', () => {
  it('calls addGate("theme") on module load', () => {
    expect(addGateCalledOnImport).toBe(true)
  })

  it('renders children', async () => {
    const { getByText } = await render(
      <ReduxProvider store={makeStore()}>
        <Theme>
          <Text>hello world</Text>
        </Theme>
      </ReduxProvider>
    )
    expect(getByText('hello world')).toBeTruthy()
  })

  it('passes appearance from Redux state to auto-paper Provider', async () => {
    await render(
      <ReduxProvider store={makeStore({ appearance: 'dark', color: '#4caf50' })}>
        <Theme>
          <Text>child</Text>
        </Theme>
      </ReduxProvider>
    )
    expect(mockProviderCalls.length).toBeGreaterThan(0)
    expect(mockProviderCalls[0]).toEqual(expect.objectContaining({ initialValue: expect.objectContaining({ appearance: 'dark' }) }))
  })

  it('passes color from Redux state to auto-paper Provider', async () => {
    await render(
      <ReduxProvider store={makeStore({ appearance: 'light', color: '#ff0000' })}>
        <Theme>
          <Text>child</Text>
        </Theme>
      </ReduxProvider>
    )
    expect(mockProviderCalls.length).toBeGreaterThan(0)
    expect(mockProviderCalls[0]).toEqual(expect.objectContaining({ initialValue: expect.objectContaining({ color: '#ff0000' }) }))
  })

  it('passes an onReady callback to auto-paper Provider', async () => {
    await render(
      <ReduxProvider store={makeStore()}>
        <Theme>
          <Text>child</Text>
        </Theme>
      </ReduxProvider>
    )
    expect(mockProviderCalls.length).toBeGreaterThan(0)
    const props = mockProviderCalls[0] as any
    expect(typeof props.onReady).toBe('function')
  })

  it('calls clearGate("theme") when onReady fires', async () => {
    await render(
      <ReduxProvider store={makeStore()}>
        <Theme>
          <Text>child</Text>
        </Theme>
      </ReduxProvider>
    )
    const props = mockProviderCalls[0] as any
    await act(async () => {
      props.onReady()
    })
    expect(mockClearGate).toHaveBeenCalledWith('theme')
  })
})
