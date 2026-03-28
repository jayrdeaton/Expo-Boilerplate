import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, ScannerMenu } from '../'

describe('ScannerMenu', () => {
  it('renders without crashing', () => {
    render(<ScannerMenu />, { wrapper: Providers })
  })
})
