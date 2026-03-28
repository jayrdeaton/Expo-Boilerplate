import { render } from '@testing-library/react-native'
import React from 'react'

import { CollapsibleHeader, Providers } from '../'

describe('CollapsibleHeader', () => {
  it('renders without crashing', () => {
    render(<CollapsibleHeader icon='test' onPress={() => {}} title='Test' visible={false} />, { wrapper: Providers })
  })
})
