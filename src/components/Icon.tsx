import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TextStyle } from 'react-native'

import { useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'

export type IconProps = {
  color?: string
  disabled?: boolean
  name: string
  primary?: boolean
  size?: number
  style?: TextStyle | TextStyle[]
  variant?: ThemeVariant
}

export const Icon = ({ color, disabled, name, primary, size, style, variant }: IconProps) => {
  const { theme } = useTheme()
  if (!name) return null
  const colors = getVariantColors(theme, variant)
  const _color = color || (disabled ? 'red' : primary ? colors.accent : theme.colors.text)
  const _size = size || 20
  return <Ionicons name={name as keyof typeof Ionicons.glyphMap} size={_size} color={_color} style={[styles.icon, style]} />
}
const styles = StyleSheet.create({
  icon: { textAlign: 'center' }
})
