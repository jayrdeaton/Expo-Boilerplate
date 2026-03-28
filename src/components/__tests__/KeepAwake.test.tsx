import { render } from '@testing-library/react-native'
import React from 'react'

import { KeepAwake, Providers } from '../'

describe('KeepAwake', () => {
  it('activates when active=true', () => {
    render(<KeepAwake active />, { wrapper: Providers })
  })
  it('deactivates when active=false', () => {
    render(<KeepAwake active={false} />, { wrapper: Providers })
  })
})
