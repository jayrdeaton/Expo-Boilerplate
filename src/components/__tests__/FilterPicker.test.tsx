import { render } from '@testing-library/react-native'
import React from 'react'

import { FilterPicker, Providers } from '../'

describe('FilterPicker', () => {
  it('renders without crashing', () => {
    render(<FilterPicker value={{}} keys={[]} onChange={() => {}} />, { wrapper: Providers })
  })
})
