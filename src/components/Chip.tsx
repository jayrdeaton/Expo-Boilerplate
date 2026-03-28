import * as haptics from 'expo-haptics'
import { useMemo } from 'react'
import { GestureResponderEvent } from 'react-native'
import { Chip as PaperChip, ChipProps as PaperChipProps } from 'react-native-paper'

import { icons } from '../constants'
import { useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'
import { Icon } from './Icon'

export type ChipProps = {
  icon?: string
  iconColor?: string
  closeIcon?: string
  variant?: ThemeVariant
} & PaperChipProps

export const Chip = ({ icon, iconColor, closeIcon = icons.close, onLongPress, onPress, variant, ...props }: ChipProps) => {
  const { theme } = useTheme()
  const colors = useMemo(() => getVariantColors(theme, variant), [theme, variant])
  const handleLongPress = onLongPress
    ? () => {
        haptics.notificationAsync()
        onLongPress()
      }
    : undefined
  const handlePress = onPress
    ? (event: GestureResponderEvent) => {
        haptics.selectionAsync()
        onPress(event)
      }
    : undefined
  const renderIcon = (_props: object) => (icon ? <Icon {..._props} name={icon} color={iconColor || colors.accent} variant={variant} /> : undefined)
  const renderCloseIcon = (_props: object) => <Icon {..._props} name={closeIcon} variant={variant} />
  return <PaperChip {...props} icon={renderIcon} mode='outlined' closeIcon={renderCloseIcon} onLongPress={handleLongPress} onPress={handlePress} rippleColor={colors.ripple} />
}
