import { render } from '@testing-library/react-native'
import React from 'react'

import { MenuItem, MenuItemSubmenu, Providers } from '../'

describe('MenuItemSubmenu', () => {
  it('renders without crashing', () => {
    render(
      <MenuItemSubmenu title='Test' onDismiss={() => {}}>
        <MenuItem title='Item 1' />
        <MenuItem title='Item 2' />
      </MenuItemSubmenu>,
      { wrapper: Providers }
    )
  })
})
