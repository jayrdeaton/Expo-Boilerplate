import { render } from '@testing-library/react-native'
import React from 'react'

import { Row } from '../'

describe('Row', () => {
  it('renders without crashing', () => {
    render(
      <Row>
        <></>
      </Row>
    )
  })
})
