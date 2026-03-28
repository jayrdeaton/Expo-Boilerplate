import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, TagsPanel } from '../'

describe('TagsPanel', () => {
  it('renders without crashing', () => {
    render(<TagsPanel item={{ tags: [] }} />, { wrapper: Providers })
  })
})
