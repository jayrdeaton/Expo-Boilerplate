import { render } from '@testing-library/react-native'
import React from 'react'

import { ExpandableButton, Providers } from '../'

describe('ExpandableButton', () => {
  it('renders without crashing', () => {
    render(<ExpandableButton expanded={false} icon='test' />, { wrapper: Providers })
  })
})
