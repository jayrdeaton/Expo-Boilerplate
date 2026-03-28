import { render } from '@testing-library/react-native'
import React from 'react'

import { ListItem, Providers } from '../'

describe('ListItem', () => {
  it('renders with minimal props', () => {
    render(<ListItem icon='test' title='Test' />, { wrapper: Providers })
  })
})
