import { type ReactNode } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Portal } from 'react-native-paper'

import { useTheme } from '../hooks'

export type WrapperProps = {
  children: ReactNode
  containerStyle?: ViewStyle
  style?: ViewStyle
}

export const Wrapper = ({ children, style }: WrapperProps) => {
  const { theme } = useTheme()
  return (
    <Portal.Host>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.background }, style]}>{children}</View>
    </Portal.Host>
  )
}
