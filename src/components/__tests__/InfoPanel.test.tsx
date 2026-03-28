import { render } from '@testing-library/react-native'
import React from 'react'

import { InfoPanel } from '../'

describe('InfoPanel', () => {
  it('renders without crashing', () => {
    render(<InfoPanel />)
  })
})
