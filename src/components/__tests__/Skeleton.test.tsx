import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, Skeleton } from '../'

describe('Skeleton', () => {
  it('renders without crashing', () => {
    render(<Skeleton />, { wrapper: Providers })
  })
})
