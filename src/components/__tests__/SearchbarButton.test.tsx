import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, SearchbarButton } from '../'

describe('SearchbarButton', () => {
  it('renders without crashing', () => {
    render(<SearchbarButton />, { wrapper: Providers })
  })
})
