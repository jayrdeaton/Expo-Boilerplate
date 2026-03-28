import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, SearchFAB } from '../'

describe('SearchFAB', () => {
  it('renders without crashing', () => {
    render(<SearchFAB onChangeText={() => {}} value={''} />, { wrapper: Providers })
  })
})
