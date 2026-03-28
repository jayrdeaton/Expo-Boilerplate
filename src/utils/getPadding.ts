import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

export const getPadding = (style?: StyleProp<ViewStyle>): { top: number; right: number; bottom: number; left: number } => {
  const flattened = StyleSheet.flatten(style)
  const top: number = Number(flattened?.padding || flattened?.paddingTop || 0)
  const right: number = Number(flattened?.padding || flattened?.paddingRight || 0)
  const bottom: number = Number(flattened?.padding || flattened?.paddingBottom || 0)
  const left: number = Number(flattened?.padding || flattened?.paddingLeft || 0)
  return { top, right, bottom, left }
}
