import { render, waitFor } from '@testing-library/react-native'
import React from 'react'

import { IconButton, Providers } from '../'

describe('IconButton', () => {
  it('renders without crashing', async () => {
    const result = render(<IconButton icon='cog' />, { wrapper: Providers })
    await waitFor(() => {
      expect(result).toBeDefined()
    })
  })
})
