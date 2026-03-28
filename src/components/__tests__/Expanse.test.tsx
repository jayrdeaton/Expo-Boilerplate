import { render } from '@testing-library/react-native'
import React from 'react'

import { Expanse } from '../'

describe('Expanse', () => {
  it('renders without crashing', () => {
    render(
      <Expanse expanded={false} width={100}>
        <></>
      </Expanse>
    )
  })
})
