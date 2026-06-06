import React from 'react'
import { render } from '@testing-library/react-native'

jest.mock('expo-router', () => ({
  Tabs: Object.assign(
    (props: any) => props.children,
    { Screen: () => null }
  ),
}))

import TabsLayout from '../../app/(tabs)/_layout'

describe('TabsLayout', () => {
  it('renders without crashing', async () => {
    await expect(render(<TabsLayout />)).resolves.toBeDefined()
  })
})
