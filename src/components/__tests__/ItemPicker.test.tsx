import { render } from '@testing-library/react-native'
import React from 'react'

import { ItemPicker, Providers } from '../'

describe('ItemPicker', () => {
  it('renders without crashing', () => {
    render(<ItemPicker collection='products' icon='test' visible={false} onChange={() => undefined} onClose={() => undefined} />, { wrapper: Providers })
  })
})
