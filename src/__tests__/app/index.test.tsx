import React from 'react'
import { render } from '@testing-library/react-native'

const mockRedirectCalls: unknown[] = []
jest.mock('expo-router', () => ({
  Redirect: (props: { href: string }) => {
    mockRedirectCalls.push(props)
    return null
  },
}))

import Index from '../../app/index'

beforeEach(() => {
  mockRedirectCalls.length = 0
})

describe('app/index', () => {
  it('renders without crashing', async () => {
    await expect(render(<Index />)).resolves.toBeDefined()
  })

  it('renders a Redirect to tabs', async () => {
    await render(<Index />)
    expect(mockRedirectCalls.length).toBe(1)
    expect(mockRedirectCalls[0]).toEqual(
      expect.objectContaining({ href: '/(tabs)' })
    )
  })
})
