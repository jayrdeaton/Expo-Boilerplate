import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

export const getPaddingTop = (style?: StyleProp<ViewStyle>): number => {
  const flattened = StyleSheet.flatten(style)
  const paddingTop: number = Number(flattened?.paddingTop || 0)
  return paddingTop
}
