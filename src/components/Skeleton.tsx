import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'

import { layout } from '../constants'

export type SkeletonProps = {
  width?: number
  height?: number
  lines?: number
  style?: StyleProp<ViewStyle>
}

export const Skeleton = ({ width, height = 14, lines = 1, style }: SkeletonProps) => {
  const { colors } = useTheme()
  const bg = (colors as { surfaceVariant?: string }).surfaceVariant || 'rgba(0,0,0,0.08)'
  return (
    <View style={style} accessibilityRole='progressbar' accessibilityState={{ busy: true }}>
      {Array.from({ length: Math.max(1, lines) }).map((_, idx) => {
        const sizeStyle: ViewStyle = { backgroundColor: bg, height, alignSelf: 'stretch' }
        if (typeof width === 'number') sizeStyle.width = width
        return <View key={idx} style={[styles.line, sizeStyle, idx < lines - 1 && styles.lineGap]} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    borderRadius: layout.borderRadius
  },
  lineGap: {
    marginBottom: 8
  }
})
