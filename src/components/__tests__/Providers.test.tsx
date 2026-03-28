import { render } from '@testing-library/react-native'
import React from 'react'
import { Text, View } from 'react-native'

import { Providers } from '../'

describe('Providers', () => {
  it('renders without crashing', () => {
    render(
      <Providers>
        <></>
      </Providers>
    )
  })

  it('renders children correctly', () => {
    const testText = 'Test Child Component'
    const result = render(
      <Providers>
        <Text testID='test-child'>{testText}</Text>
      </Providers>
    )
    expect(result.getByTestId('test-child')).toBeTruthy()
    expect(result.getByText(testText)).toBeTruthy()
  })

  it('accepts and renders multiple children', () => {
    const result = render(
      <Providers>
        <Text testID='child-1'>First Child</Text>
        <Text testID='child-2'>Second Child</Text>
        <View testID='child-3'>
          <Text>Third Child</Text>
        </View>
      </Providers>
    )

    expect(result.getByTestId('child-1')).toBeTruthy()
    expect(result.getByTestId('child-2')).toBeTruthy()
    expect(result.getByTestId('child-3')).toBeTruthy()
  })

  it('provides the required context providers', () => {
    // This test verifies that the component structure includes all necessary providers
    // by checking that no errors are thrown during rendering
    const TestComponent = () => (
      <View>
        <Text>Provider test</Text>
      </View>
    )

    expect(() => {
      render(
        <Providers>
          <TestComponent />
        </Providers>
      )
    }).not.toThrow()
  })

  it('handles undefined children gracefully', () => {
    expect(() => {
      render(<Providers>{undefined}</Providers>)
    }).not.toThrow()
  })

  it('handles null children gracefully', () => {
    expect(() => {
      render(<Providers>{null}</Providers>)
    }).not.toThrow()
  })
})
