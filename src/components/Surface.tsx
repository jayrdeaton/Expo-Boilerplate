import { type ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { Surface as PaperSurface, SurfaceProps as PaperSurfaceProps, Text } from 'react-native-paper'

import { layout } from '../constants'

export type SurfaceProps = {
  children: ReactNode
  title?: string
  right?: ReactNode
} & PaperSurfaceProps

export const Surface = ({ children, right, style, title, ...restProps }: SurfaceProps) => {
  return (
    <PaperSurface {...restProps} style={[styles.surface, style]}>
      <View style={styles.inner}>
        {title || right ? (
          <View style={styles.header}>
            <Text variant='titleLarge' style={styles.title}>
              {title}
            </Text>
            {right}
          </View>
        ) : null}
        {children}
      </View>
    </PaperSurface>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 6,
    width: '100%'
  },
  inner: {},
  surface: {
    borderRadius: layout.borderRadius,
    flexGrow: 1,
    justifyContent: 'center',
    margin: 2,
    paddingVertical: 2
  },
  title: { marginRight: 'auto' }
})
