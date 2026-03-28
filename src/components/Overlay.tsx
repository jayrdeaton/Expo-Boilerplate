/**
 * Overlay
 *
 * Renders children with a semi-transparent Surface overlay on top for dimming effect.
 *
 * Example:
 *   <Overlay opacity={0.5}><Image source={uri} /></Overlay>
 */
import { type ReactNode } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Surface } from 'react-native-paper'

import { layout } from '../constants'

/**
 * Props for {@link Overlay}.
 *
 * @property children - Content to render beneath the overlay.
 * @property opacity - Opacity of the overlay surface.
 * @property style - Optional container style.
 */
export type OverlayProps = {
  children: ReactNode
  opacity?: number
  style?: ViewStyle
}

export const Overlay = ({ children, opacity = 0.7, style }: OverlayProps) => {
  return (
    <View style={style}>
      <Surface style={[styles.overlay, { opacity: opacity || layout.opacity }]}>
        <View />
      </Surface>
      <View>{children}</View>
    </View>
  )
}
const styles = StyleSheet.create({
  overlay: {
    borderRadius: layout.borderRadius,
    height: '100%',
    position: 'absolute',
    width: '100%'
  }
})
