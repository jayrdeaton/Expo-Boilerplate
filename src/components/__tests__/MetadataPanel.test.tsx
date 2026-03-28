import { render } from '@testing-library/react-native'
import React from 'react'

import { MetadataPanel, Providers } from '../'

describe('MetadataPanel', () => {
  it('renders without crashing', () => {
    render(<MetadataPanel item={{ metadata: {} }} />, { wrapper: Providers })
  })
})
