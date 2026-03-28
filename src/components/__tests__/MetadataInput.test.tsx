import { render, waitFor } from '@testing-library/react-native'
import React from 'react'

import { MetadataInput, Providers } from '../'

describe('MetadataInput', () => {
  it('renders without crashing', async () => {
    const result = render(<MetadataInput onChange={() => {}} value={{}} />, { wrapper: Providers })
    await waitFor(() => {
      expect(result).toBeDefined()
    })
  })
})
