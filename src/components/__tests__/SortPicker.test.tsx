import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, SortPicker } from '../'

describe('SortPicker', () => {
  it('renders without crashing', () => {
    render(<SortPicker onChange={() => {}} values={['title']} />, { wrapper: Providers })
  })
})
