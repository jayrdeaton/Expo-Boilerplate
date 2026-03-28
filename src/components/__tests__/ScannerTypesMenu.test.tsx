import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, ScannerTypesMenu } from '../'

describe('ScannerTypesMenu', () => {
  it('renders without crashing', () => {
    render(<ScannerTypesMenu />, { wrapper: Providers })
  })
})
