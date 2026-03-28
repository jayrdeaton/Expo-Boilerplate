import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, TitlePanel } from '../'

type Item = { id?: string; title?: string | null }

describe('TitlePanel', () => {
  it('renders without crashing', () => {
    const item: Item = { id: '1', title: 'Title' }
    render(<TitlePanel item={item} />, { wrapper: Providers })
  })
})
