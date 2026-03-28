import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, TagsInput } from '../'

describe('TagsInput', () => {
  it('renders without crashing', () => {
    render(<TagsInput value={[]} onChange={() => {}} />, { wrapper: Providers })
  })
})
