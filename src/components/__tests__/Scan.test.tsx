import { render } from '@testing-library/react-native'
import React from 'react'
import { Animated } from 'react-native'

import { Providers, Scan } from '../'

describe('Scan', () => {
  it('renders without crashing', () => {
    render(
      <Scan
        check={new Animated.Value(0)}
        color='white'
        height={new Animated.Value(10)}
        width={new Animated.Value(10)}
        origin={new Animated.ValueXY({ x: 0, y: 0 })}
        scan={{
          type: 'qr',
          data: 'test',
          cornerPoints: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 1 }
          ],
          bounds: { origin: { x: 0, y: 0 }, size: { width: 1, height: 1 } }
        }}
        onPress={() => {}}
      />,
      { wrapper: Providers }
    )
  })
})
