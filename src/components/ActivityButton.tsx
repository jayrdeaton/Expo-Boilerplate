/**
 * ActivityButton
 *
 * Conditionally renders an activity spinner or an icon button based on the `active` state.
 * Useful for async actions where you want to show progress in-place without changing layout.
 *
 * Example:
 *   <ActivityButton active={isSaving} icon="content-save" size="large" />
 */
import { StyleSheet, View, ViewStyle } from 'react-native'

import { ActivityIndicator } from './ActivityIndicator'
import { IconButton } from './IconButton'

/**
 * Props for {@link ActivityButton}.
 *
 * @property active - When true, shows an ActivityIndicator; when false, shows the IconButton.
 * @property icon - Name of the icon to render when not active. Also used to derive testIDs.
 * @property size - Visual size of the indicator or icon. Accepts numeric pixel size or Paper sizes.
 * @property style - Optional container style applied to the wrapper View.
 * @property testID - Optional base testID; if omitted, one is derived from `icon`.
 */
export type ActivityButtonProps = {
  active: boolean
  disabled?: boolean
  icon: string
  iconColor?: string
  size?: number | 'small' | 'large' | undefined
  style?: ViewStyle
  testID?: string
}

/**
 * Renders either an {@link ActivityIndicator} (when `active`) or an {@link IconButton}.
 *
 * @param props - {@link ActivityButtonProps}
 */
export const ActivityButton = ({ active, icon, iconColor, disabled, size = 'small', style }: ActivityButtonProps) => {
  return <View style={style}>{active ? <ActivityIndicator style={size === 'large' ? styles.large : styles.regular} size={size} testID={icon ? `${icon}-activity-indicator` : 'activity-indicator'} /> : <IconButton icon={icon} iconColor={iconColor} disabled={disabled} size={size === 'large' ? 36 : 24} testID={icon ? `${icon}-icon-button` : 'icon-button'} />}</View>
}
const styles = StyleSheet.create({
  large: { margin: 9 },
  regular: { margin: 8 }
})
