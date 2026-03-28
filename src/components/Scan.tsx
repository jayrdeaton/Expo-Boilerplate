import { BarcodeScanningResult } from 'expo-camera'
import { type ReactNode } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import { colors, icons } from '../constants'
import { Bounds } from './Bounds'
import { Icon } from './Icon'
import { Touchable } from './Touchable'

const WIDTH = 30

export type ScanNode = { key: string; props: ScanProps } & ReactNode

export type ScanProps = {
  check: Animated.Value
  color: string
  height: Animated.Value
  onPress: (scan: BarcodeScanningResult) => void
  origin: Animated.ValueXY
  scan: BarcodeScanningResult
  width: Animated.Value
}

export const Scan = ({ check, color, height, onPress, origin, scan, width }: ScanProps) => {
  const handlePress = () => onPress(scan)
  return (
    <Animated.View style={[styles.absolute, { top: origin.y, left: origin.x, height, width }]}>
      <Touchable style={[StyleSheet.absoluteFill, styles.touchable]} onPress={handlePress}>
        <View style={StyleSheet.absoluteFill}>
          <Bounds color={color} />
          <Animated.View
            style={{
              width: check.interpolate({
                inputRange: [0, 1],
                outputRange: [0, WIDTH]
              })
            }}
          >
            <View style={styles.icon}>
              <Icon color={color} name={icons.checkmark} size={30} />
            </View>
          </Animated.View>
          <View style={[styles.shadow, styles.stack]}>
            <Text numberOfLines={1} style={styles.text}>
              {scan.type}
            </Text>
            <Text numberOfLines={1} ellipsizeMode='middle' style={styles.text}>
              {scan.data}
            </Text>
          </View>
        </View>
      </Touchable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
  icon: {
    height: 44,
    justifyContent: 'center',
    marginRight: 4,
    width: '100%'
  },
  shadow: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.opaque,
    borderRadius: 5,
    justifyContent: 'center'
  },
  stack: {
    flex: 1,
    padding: 5
  },
  text: {
    color: colors.white
  },
  touchable: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})
