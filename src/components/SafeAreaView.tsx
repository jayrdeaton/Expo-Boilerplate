import { type ReactNode } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type SafeAreaViewProps = {
  children: ReactNode
  style?: ViewStyle | ViewStyle[]
}

export const SafeAreaView = ({ children, style }: SafeAreaViewProps) => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={[
        styles.flex,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        },
        style
      ]}
    >
      {children}
    </View>
  )
}
const styles = StyleSheet.create({
  flex: { flex: 1 }
})
