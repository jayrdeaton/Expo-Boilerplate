import { ReactNode } from 'react'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types'

export type ClipTextProps = {
  children: ReactNode
  style?: StyleProp<TextStyle>
  maxHeight?: number | null
  variant?: VariantProp<never>
}

export const ClipText = ({ children, style, maxHeight = null, variant = 'bodyMedium' }: ClipTextProps) => {
  const flattened = StyleSheet.flatten(style)
  const fontSize = flattened?.fontSize || 14
  const lineHeight = flattened?.lineHeight || Math.round(fontSize * 1.2)
  const maxLines = maxHeight ? Math.max(1, Math.floor(maxHeight / lineHeight)) : undefined
  return (
    <Text variant={variant} numberOfLines={maxLines} ellipsizeMode={maxLines ? 'tail' : undefined} allowFontScaling={false} style={[style, { fontSize, lineHeight }]}>
      {children}
    </Text>
  )
}
