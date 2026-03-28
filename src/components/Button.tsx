/**
 * Button
 *
 * A thin wrapper around react-native-paper's Button that adds subtle haptic feedback
 * on press and long press, and integrates with the internal {@link Icon} component
 * for icon rendering.
 *
 * Example:
 *   <Button mode="contained" icon="content-save" onPress={save}>Save</Button>
 */
import * as haptics from 'expo-haptics'
import { GestureResponderEvent } from 'react-native'
import { Button as PaperButton, ButtonProps as PaperButtonProps, MD3Theme } from 'react-native-paper'

import { useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'
import { Icon } from './Icon'

/**
 * Props for {@link Button}.
 * Extends Paper's Button props, except the `theme` prop is re-typed to MD3Theme for convenience.
 *
 * @property icon - Optional icon name (passed to internal {@link Icon}).
 * @property theme - Optional MD3 theme to apply.
 */
export type ButtonProps = {
  icon?: string
  theme?: MD3Theme
  variant?: ThemeVariant
} & Omit<PaperButtonProps, 'theme'>

/**
 * Button with haptic feedback.
 *
 * - Triggers selection haptics on press and notification haptics on long press.
 * - Renders the provided `icon` using the internal {@link Icon} component.
 *
 * @param props - {@link ButtonProps}
 */
export const Button = ({ icon, onLongPress, onPress, variant, ...props }: ButtonProps) => {
  const { theme } = useTheme()
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
  const colors = getVariantColors(theme, variant)
  const renderIcon = (_props: object) => <Icon {..._props} name={icon} />
  return <PaperButton theme={{ colors: { primary: colors.accent } }} uppercase={false} {...props} onLongPress={handleLongPress} onPress={handlePress} icon={renderIcon} />
}
