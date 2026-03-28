import { render } from '@testing-library/react-native'
import React from 'react'

import { Providers, SafeAreaView } from '../'

describe('SafeAreaView', () => {
  it('renders without crashing', () => {
    render(
      <SafeAreaView>
        <></>
      </SafeAreaView>,
      { wrapper: Providers }
    )
  })
})
