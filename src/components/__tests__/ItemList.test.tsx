import { render, waitFor } from '@testing-library/react-native'
import React from 'react'

import { ItemList, Providers } from '../'

describe('ItemList', () => {
  it('renders without crashing', async () => {
    const result = render(<ItemList collection='products' icon='test' />, { wrapper: Providers })
    await waitFor(() => {
      expect(result).toBeDefined()
    })
  })
})
