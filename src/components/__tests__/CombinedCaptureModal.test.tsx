import { render } from '@testing-library/react-native'
import React from 'react'

import { CombinedCaptureModal, Providers } from '../'

describe('CombinedCaptureModal', () => {
  it('renders without crashing when visible is false', () => {
    render(<CombinedCaptureModal visible={false} onClose={() => {}} />, { wrapper: Providers })
  })

  it('shows mode toggle in hybrid mode', () => {
    const result = render(<CombinedCaptureModal visible={true} onClose={() => {}} onScan={() => {}} onChange={() => {}} />, { wrapper: Providers })
    expect(result.getByTestId('combined-capture-toggle')).toBeTruthy()
  })

  it('does not show mode toggle in photo-only mode', () => {
    const result = render(<CombinedCaptureModal visible={true} onClose={() => {}} onChange={() => {}} />, { wrapper: Providers })
    expect(result.queryByTestId('combined-capture-toggle')).toBeNull()
  })
})
