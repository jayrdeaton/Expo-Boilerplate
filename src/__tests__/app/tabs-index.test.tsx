import React from 'react'
import { render } from '@testing-library/react-native'

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
