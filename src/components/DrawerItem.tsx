import { type ReactNode, useMemo } from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'

import { layout } from '../constants'
import { useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'
import { Icon } from './Icon'
import { TextAndCaption } from './TextAndCaption'
import { Touchable, TouchableProps } from './Touchable'

export type DrawerItemProps = {
  caption?: string
  column?: boolean
  children?: ReactNode
  focused?: boolean
  icon: string
  size?: number
  style?: ViewStyle | ViewStyle[]
  title: string
  textStyle?: TextStyle | TextStyle[]
  variant?: ThemeVariant
} & Omit<TouchableProps, 'children'>

export const DrawerItem = ({ caption, children, column, focused, icon, size = 26, style, textStyle, title, variant, ...props }: DrawerItemProps) => {
  const { theme } = useTheme()
  const colors = useMemo(() => getVariantColors(theme, variant), [variant, theme])
  const backgroundColor = focused ? colors.container : theme.colors.background
  const iconColor = focused ? colors.accent : theme.colors.onBackground
  const textColor = focused ? colors.onContainer : theme.colors.onBackground
  return (
    <Touchable rippleColor={colors.ripple} style={[styles.container, { backgroundColor }, style]} {...props}>
      <View style={[styles.group, !column && styles.row]}>
        <Icon name={`${icon}${focused ? '' : '-outline'}`} color={iconColor} size={size} />
        <TextAndCaption text={title} caption={caption} style={styles.text} textStyle={[{ color: textColor }, StyleSheet.flatten(textStyle)]} captionStyle={[{ color: textColor }, StyleSheet.flatten(textStyle)]} />
        {children}
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: layout.borderRadius,
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 4,
    paddingHorizontal: 4,
    paddingVertical: 8
  },
  group: { alignItems: 'center' },
  row: { flexDirection: 'row' },
  text: { flex: 1, marginHorizontal: 4 }
})
