/**
 * IconButton
 *
 * A react-native-paper IconButton wrapper that adds haptic feedback for press and long press
 * and uses the internal {@link Icon} component for consistent icon rendering.
 *
 * Example:
 *   <IconButton icon="plus" onPress={addItem} />
 */
import * as haptics from 'expo-haptics'
import { GestureResponderEvent, StyleSheet, ViewStyle } from 'react-native'
import { IconButton as PaperIconButton, IconButtonProps as PaperIconButtonProps, MD3Theme } from 'react-native-paper'

import { useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'
import { Icon } from './Icon'

/**
 * Props for {@link IconButton}.
 *
 * @property children - Optional accessibility label string.
 * @property icon - Icon name to render with {@link Icon}.
 * @property style - Optional style or array of styles for the button.
 * @property theme - Optional MD3 theme.
 * @property testID - Optional test identifier.
 * @property variant - Optional theme variant.
 */
export type IconButtonProps = {
  children?: string
  icon: string
  style?: ViewStyle | ViewStyle[]
  theme?: MD3Theme
  testID?: string
  variant?: ThemeVariant
} & Omit<PaperIconButtonProps, 'children' | 'theme'>

/**
 * IconButton with haptic feedback on press and long press.
 *
 * @param props - {@link IconButtonProps}
 */
export const IconButton = ({ icon, iconColor, onLongPress, onPress, style, testID, variant, ...props }: IconButtonProps) => {
  const { theme } = useTheme()
  const colors = getVariantColors(theme, variant)
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
  const color = props.disabled ? theme.colors.onSurfaceDisabled : iconColor ? iconColor : variant ? colors.accent : undefined
  const renderIcon = (_props: object) => <Icon {..._props} color={color} name={icon} />
  return <PaperIconButton {...props} onLongPress={handleLongPress} onPress={handlePress} icon={typeof icon === 'string' || icon === null ? renderIcon : icon} style={[styles.button, style]} testID={testID} />
}
const styles = StyleSheet.create({
  button: { margin: 0 }
})
