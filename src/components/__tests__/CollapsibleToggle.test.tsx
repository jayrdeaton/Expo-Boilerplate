import { render } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'

import { CollapsibleToggle, Providers } from '../'

describe('CollapsibleToggle', () => {
  it('renders without crashing', () => {
    render(<CollapsibleToggle visible={true} primaryChildren={<Text>Primary</Text>} secondaryChildren={<Text>Secondary</Text>} />, { wrapper: Providers })
  })
})
