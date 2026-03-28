import { render } from '@testing-library/react-native'
import React from 'react'

import { MenuButton, MenuItem, Providers } from '../'

describe('MenuButton', () => {
  it('renders without crashing', () => {
    render(
      <MenuButton>
        <MenuItem title='One' />
        <MenuItem title='Two' />
      </MenuButton>,
      { wrapper: Providers }
    )
  })
})
