import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, TextAndCaption } from '../'

describe('TextAndCaption', () => {
  it('renders without crashing', () => {
    render(<TextAndCaption text='Title' caption='Caption' />, { wrapper: Providers })
  })
})
