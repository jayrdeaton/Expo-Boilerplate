import { render } from '@testing-library/react-native'
import React from 'react'

import { ColorPicker, Providers } from '../'

describe('ColorPicker', () => {
  it('renders without crashing', () => {
    render(<ColorPicker anchor={{ x: 0, y: 0 }} color={''} onClose={() => {}} onPick={() => {}} visible={false} />, { wrapper: Providers })
  })
})
