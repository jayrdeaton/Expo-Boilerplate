import { render } from '@testing-library/react-native'
import React from 'react'

import { GridItem, Providers } from '../'

describe('GridItem', () => {
  it('renders without crashing', () => {
    render(<GridItem item={{}} icon='test' columns={2} title='Test' onPress={() => {}} />, { wrapper: Providers })
  })
})
