import { render } from '@testing-library/react-native'
import React from 'react'

import { FlatList, Providers } from '../'

describe('FlatList', () => {
  it('renders without crashing', () => {
    render(<FlatList data={[]} renderItem={() => null} />, { wrapper: Providers })
  })
})
