import { render } from '@testing-library/react-native'
import React from 'react'

import { ItemMenu, Providers } from '../'

describe('ItemMenu', () => {
  it('renders without crashing', () => {
    render(<ItemMenu collection='products' item={{ id: '1', title: 'Test', createdAt: null, updatedAt: null }} />, { wrapper: Providers })
  })
})
