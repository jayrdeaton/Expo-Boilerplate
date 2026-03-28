import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, ScannerModal } from '../'

describe('ScannerModal', () => {
  it('renders without crashing', () => {
    render(<ScannerModal onClose={() => {}} onScan={() => {}} visible={false} />, { wrapper: Providers })
  })
})
