import { StyleSheet, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { Overlay } from './Overlay'

export type BadgeProps = {
  style: ViewStyle
  children: string | number
}

export const Badge = ({ children, style }: BadgeProps) => {
  return (
    <Overlay style={style}>
      <Text variant='bodyLarge' style={styles.value}>
        {children}
      </Text>
    </Overlay>
  )
}
const styles = StyleSheet.create({
  value: { padding: 6 }
})
