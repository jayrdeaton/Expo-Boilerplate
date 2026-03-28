import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, Switch } from '../'

describe('Switch', () => {
  it('renders without crashing', () => {
    render(<Switch value={false} onChange={() => {}} />, { wrapper: Providers })
  })
})
