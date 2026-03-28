import { type ReactNode } from 'react'
import { GestureResponderEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Surface, SurfaceProps } from 'react-native-paper'

import { layout } from '../constants'
import { Touchable } from './Touchable'

export type PanelProps = {
  children: ReactNode
  containerStyle?: StyleProp<ViewStyle>
  disabled?: boolean
  onPress?: (e: GestureResponderEvent) => void
  onLongPress?: (e: GestureResponderEvent) => void
} & SurfaceProps

export const Panel = ({ children, containerStyle, disabled, onPress, onLongPress, style, ...props }: PanelProps) => {
  return (
    <Surface {...props} style={[styles.surface, style]}>
      <Touchable disabled={disabled || (!onPress && !onLongPress)} onPress={onPress} onLongPress={onLongPress} style={[styles.touchable, containerStyle]}>
        <View style={styles.inner}>{children}</View>
      </Touchable>
    </Surface>
  )
}

const styles = StyleSheet.create({
  inner: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 4
  },
  surface: {
    borderRadius: layout.borderRadius,
    flexGrow: 1,
    justifyContent: 'center',
    margin: 2
  },
  touchable: {
    flexGrow: 1
  }
})
