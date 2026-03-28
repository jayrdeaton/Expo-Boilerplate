import { type ReactNode } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

export type WrappingRowProps = {
  children?: ReactNode
  style?: ViewStyle
}

export const WrappingRow = ({ children, style }: WrappingRowProps) => {
  return <View style={[styles.row, style]}>{children}</View>
}

const styles = StyleSheet.create({
  row: {
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    width: '100%'
  }
})
