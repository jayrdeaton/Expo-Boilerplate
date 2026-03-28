import { render } from '@testing-library/react-native'
import React from 'react'

import { Icon, Providers } from '../'

describe('Icon', () => {
  it('renders without crashing', () => {
    render(<Icon name='cog' />, { wrapper: Providers })
  })
})
