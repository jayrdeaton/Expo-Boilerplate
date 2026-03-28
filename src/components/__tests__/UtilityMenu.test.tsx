import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, UtilityMenu } from '../'

describe('UtilityMenu', () => {
  it('renders without crashing', () => {
    render(<UtilityMenu />, { wrapper: Providers })
  })
})
