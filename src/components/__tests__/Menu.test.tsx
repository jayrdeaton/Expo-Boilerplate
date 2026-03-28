import { render } from '@testing-library/react-native'
import React from 'react'

import { Menu, MenuItem, Providers } from '../'

describe('Menu', () => {
  it('renders without crashing', () => {
    render(
      <Menu visible={false} onDismiss={() => {}} anchor={{ x: 0, y: 0 }}>
        <MenuItem title='One' />
        <MenuItem title='Two' />
      </Menu>,
      { wrapper: Providers }
    )
  })
})
