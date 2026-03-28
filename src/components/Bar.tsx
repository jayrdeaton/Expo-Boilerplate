import { type ReactNode } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Surface, Text } from 'react-native-paper'

import { layout } from '../constants'

export type BarProps = {
  children?: ReactNode
  style?: ViewStyle
  caption?: string
  title?: string
}

export const Bar = ({ caption, children, style, title }: BarProps) => {
  return (
    <Surface style={[styles.container, style]}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        {caption ? (
          <Text variant='bodySmall' style={styles.caption}>
            {caption}
          </Text>
        ) : null}
      </View>
      <View style={styles.childWrapper}>{children}</View>
    </Surface>
  )
}

const styles = StyleSheet.create({
  caption: {
    marginVertical: -4
  },
  childWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4
  },
  container: {
    height: layout.headerHeight,
    // paddingHorizontal: 6,
    width: '100%',
    zIndex: 10
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: layout.window.width - 150
  },
  titleWrapper: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%'
  }
})
