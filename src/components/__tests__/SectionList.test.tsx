import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, SectionList } from '../'

describe('SectionList', () => {
  it('renders without crashing', () => {
    render(<SectionList mode='list' sections={[{ title: 'A', key: 'a', data: [[{ id: '1' }]] }]} renderItem={({ item: _item }) => <></>} />, { wrapper: Providers })
  })
})
