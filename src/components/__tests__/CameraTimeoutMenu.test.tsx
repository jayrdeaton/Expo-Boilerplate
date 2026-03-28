import { render, waitFor } from '@testing-library/react-native'
import React from 'react'

import { CameraTimeoutMenu, Providers } from '../'

describe('CameraTimeoutMenu', () => {
  it('renders without crashing', async () => {
    const result = render(<CameraTimeoutMenu onDismiss={() => {}} />, { wrapper: Providers })
    await waitFor(() => {
      expect(result).toBeDefined()
    })
  })
})
