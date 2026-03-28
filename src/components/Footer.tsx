import { type ReactNode } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { ScrollViewFooter } from './ScrollViewFooter'

export type FooterProps = {
  children?: ReactNode | ReactNode[]
  style?: ViewStyle
}

export const Footer = ({ children, style }: FooterProps) => {
  return (
    <ScrollViewFooter>
      <View style={[styles.container, style]}>{children}</View>
    </ScrollViewFooter>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1, flexDirection: 'row' }
})
