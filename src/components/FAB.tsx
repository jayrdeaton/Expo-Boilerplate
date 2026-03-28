import * as haptics from 'expo-haptics'
import { useMemo } from 'react'
import { GestureResponderEvent } from 'react-native'
import { FAB as PaperFAB, FABProps as PaperFABProps } from 'react-native-paper'

import { useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'
import { Icon } from './Icon'

export type FABProps = {
  icon?: string
  variant?: ThemeVariant
} & PaperFABProps

export const FAB = ({ onLongPress, onPress, style, variant, ...props }: FABProps) => {
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
  const renderIcon = (_props: object) => <Icon {..._props} name={props.icon} color={colors.onAccent} />
  return <PaperFAB animated={false} style={[{ backgroundColor: colors.accent }, style]} {...props} onLongPress={handleLongPress} onPress={handlePress} icon={renderIcon} />
}
