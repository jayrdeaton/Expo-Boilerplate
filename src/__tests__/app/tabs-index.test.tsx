import { render } from '@testing-library/react-native'
import React from 'react'

import HomeScreen from '../../app/(tabs)/index'

describe('HomeScreen', () => {
  it('renders without crashing', async () => {
    await expect(render(<HomeScreen />)).resolves.toBeDefined()
  })

  it('displays Home text', async () => {
    const { getByText } = await render(<HomeScreen />)
    expect(getByText('Home')).toBeTruthy()
  })
})
