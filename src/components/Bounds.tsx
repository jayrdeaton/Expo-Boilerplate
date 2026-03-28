import { StyleSheet, View, ViewStyle } from 'react-native'

export type BoundsProps = {
  color: string
  style?: ViewStyle
}

export const Bounds = ({ color, style }: BoundsProps) => {
  return (
    <View style={[StyleSheet.absoluteFill, style]}>
      <View style={[{ borderColor: color }, styles.corner, styles.topLeft]} />
      <View style={[{ borderColor: color }, styles.corner, styles.topRight]} />
      <View style={[{ borderColor: color }, styles.corner, styles.bottomLeft]} />
      <View style={[{ borderColor: color }, styles.corner, styles.bottomRight]} />
    </View>
  )
}
const styles = StyleSheet.create({
  bottomLeft: {
    borderBottomLeftRadius: 5,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    bottom: 0,
    left: 0
  },
  bottomRight: {
    borderBottomRightRadius: 5,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    bottom: 0,
    right: 0
  },
  corner: {
    height: 20,
    position: 'absolute',
    width: 20
  },
  topLeft: {
    borderLeftWidth: 4,
    borderTopLeftRadius: 5,
    borderTopWidth: 4,
    left: 0,
    top: 0
  },
  topRight: {
    borderRightWidth: 4,
    borderTopRightRadius: 5,
    borderTopWidth: 4,
    right: 0,
    top: 0
  }
})
