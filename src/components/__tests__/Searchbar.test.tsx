import { render, waitFor } from '@testing-library/react-native'
import React from 'react'

import { Providers, Searchbar } from '../'

describe('Searchbar', () => {
  it('renders without crashing', async () => {
    const result = render(<Searchbar onChangeText={() => {}} value='' />, { wrapper: Providers })
    await waitFor(() => {
      expect(result).toBeDefined()
    })
  })
})
