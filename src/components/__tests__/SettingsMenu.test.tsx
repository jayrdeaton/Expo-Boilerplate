import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, SettingsMenu } from '../'

describe('SettingsMenu', () => {
  it('renders without crashing', () => {
    render(<SettingsMenu />, { wrapper: Providers })
  })
})
