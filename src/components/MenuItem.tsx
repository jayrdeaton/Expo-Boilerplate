/**
 * MenuItem
 *
 * Single menu item with optional icon, caption, and selected/disabled states.
 *
 * Example:
 *   <MenuItem icon="check" title="Enabled" onPress={toggle} />
 */
import { GestureResponderEvent, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { Checkbox, Text } from 'react-native-paper'

import { useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'
import { ActivityButton } from './ActivityButton'
import { Touchable } from './Touchable'

/**
 * Props for {@link MenuItem}.
 *
 * @property caption - Optional small text below the title.
 * @property disabled - Disables press and dims colors when true.
 * @property hidden - Hides the item entirely when true.
 * @property icon - Optional icon name.
 * @property iconColor - Optional override for icon color.
 * @property onDismiss - Called after onPress to dismiss parent menu.
 * @property onPress - Called when item is pressed.
 * @property selected - Shows checkmark or primary color when true.
 * @property title - Main label text.
 */
export type MenuItemProps = {
  caption?: string
  disabled?: boolean
  hidden?: boolean
  icon?: string
  iconColor?: string
  loading?: boolean
  onDismiss?: () => void
  onPress?: (event: GestureResponderEvent) => void
  selected?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  title: string
  variant?: ThemeVariant
}

export const MenuItem = ({ caption, disabled, hidden, icon, iconColor, loading, onDismiss, onPress, selected, style, textStyle, title, variant }: MenuItemProps) => {
  const { theme } = useTheme()
  if (hidden) return null
  const colors = getVariantColors(theme, variant)
  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event)
      if (onDismiss) onDismiss()
    }
  }
  return (
    <Touchable disabled={disabled === true} onPress={onPress ? handlePress : undefined} style={style}>
      <View style={styles.row}>
        {icon !== undefined ? <ActivityButton active={loading} iconColor={iconColor ? iconColor : selected === false ? undefined : colors.accent} disabled={disabled === true} icon={icon} /> : selected !== undefined ? <Checkbox status={selected === true ? 'checked' : 'unchecked'} color={colors.accent} /> : null}
        <View>
          <Text style={[disabled && { color: theme.colors.surfaceDisabled }, textStyle]}>{title}</Text>
          {caption ? (
            <Text variant='bodySmall' style={styles.caption}>
              {caption}
            </Text>
          ) : null}
        </View>
      </View>
    </Touchable>
  )
}
const styles = StyleSheet.create({
  caption: {
    marginVertical: -2
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 4
  }
})
