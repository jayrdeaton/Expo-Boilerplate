import React from 'react'
import { render } from '@testing-library/react-native'

jest.mock('expo-router', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => {
    const { Text } = require('react-native')
    return <Text testID={`link-${href}`}>{children}</Text>
  },
  Stack: {
    Screen: () => null,
  },
}))

import NotFoundScreen from '../../app/_not-found'

describe('NotFoundScreen', () => {
  it('renders without crashing', async () => {
    await expect(render(<NotFoundScreen />)).resolves.toBeDefined()
  })

  it('shows an error message', async () => {
    const { getByText } = await render(<NotFoundScreen />)
    expect(getByText("This screen doesn't exist.")).toBeTruthy()
  })

  it('shows a link back to the home screen', async () => {
    const { getByText } = await render(<NotFoundScreen />)
    expect(getByText('Go to home screen')).toBeTruthy()
  })

  it('home link points to root', async () => {
    const { getByTestId } = await render(<NotFoundScreen />)
    expect(getByTestId('link-/')).toBeTruthy()
  })
})
