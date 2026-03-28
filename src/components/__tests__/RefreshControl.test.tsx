import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, RefreshControl } from '../'

describe('RefreshControl', () => {
  it('renders without crashing', () => {
    render(<RefreshControl refreshing={false} onRefresh={() => {}} />, { wrapper: Providers })
  })
})
