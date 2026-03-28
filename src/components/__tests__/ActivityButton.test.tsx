import { render } from '@testing-library/react-native'
import React from 'react'

import { ActivityButton, Providers } from '../'

describe('ActivityButton', () => {
  it('renders without crashing', async () => {
    render(<ActivityButton active={false} icon='cog' size={10} />, { wrapper: Providers })
  })
})
