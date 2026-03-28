import { type ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { Divider } from './Divider'

export type DrawerSectionProps = {
  children: ReactNode
  title?: string
}

export const DrawerSection = ({ children, title }: DrawerSectionProps) => {
  return (
    <View>
      <Text variant='bodySmall' style={styles.text}>
        {title}
      </Text>
      {children}
      <Divider bold />
    </View>
  )
}

const styles = StyleSheet.create({
  text: { margin: 8, marginBottom: 4 }
})
