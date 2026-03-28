import * as haptics from 'expo-haptics'
import { useMemo } from 'react'
import { GestureResponderEvent } from 'react-native'
import { TouchableRipple as PaperTouchableRipple, TouchableRippleProps as PaperTouchableRippleProps } from 'react-native-paper'

import { useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'

export type TouchableRippleProps = Omit<PaperTouchableRippleProps, 'theme'> & {
  variant?: ThemeVariant
}

export const TouchableRipple = ({ children, onPress, onLongPress, rippleColor, variant, ...props }: TouchableRippleProps) => {
  const { theme } = useTheme()
  const colors = useMemo(() => getVariantColors(theme, variant), [theme, variant])
  const handleLongPress = onLongPress
    ? (event: GestureResponderEvent) => {
        haptics.notificationAsync()
        onLongPress(event)
      }
    : undefined
  const handlePress = onPress
    ? (event: GestureResponderEvent) => {
        haptics.selectionAsync()
        onPress(event)
      }
    : undefined
  return (
    <PaperTouchableRipple rippleColor={rippleColor || colors.ripple} onPress={handlePress} onLongPress={handleLongPress} {...props}>
      {children}
    </PaperTouchableRipple>
  )
}
