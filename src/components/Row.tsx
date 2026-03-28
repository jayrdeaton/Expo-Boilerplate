import { type ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

export type RowProps = {
  children: ReactNode | ReactNode[]
  style?: StyleProp<ViewStyle>
}

export const Row = ({ children, style }: RowProps) => {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  }
})
