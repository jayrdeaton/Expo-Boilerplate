import { render } from '@testing-library/react-native'
import React from 'react'

import { Collapsible } from '../'

describe('Collapsible', () => {
  it('renders without crashing', () => {
    render(<Collapsible visible={false}>Test</Collapsible>)
  })
})
