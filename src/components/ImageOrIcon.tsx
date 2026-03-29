import { Image } from 'expo-image'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { config, layout } from '../constants'
import { useSettings, useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'
import { Icon } from './Icon'
import { Touchable } from './Touchable'

export type ImageOrIconProps = {
  blurhash?: string | null
  icon: string
  iconColor?: string
  image?: string | null
  onPress?: () => void
  size?: number
  square?: boolean
  style?: ViewStyle
  variant?: ThemeVariant
}

export const ImageOrIcon = ({ blurhash, icon, iconColor, image, onPress, size, square, style, variant }: ImageOrIconProps) => {
  const { imageMode } = useSettings()
  const { theme } = useTheme()
  const colors = getVariantColors(theme, variant)
  const height = size || 50
  const width = square ? height : height / 1.5
  return (
    <Touchable onPress={onPress} disabled={!onPress} style={[style, { height, width }]}>
      {image ? (
        <Image transition={config.imageTransition} placeholder={{ blurhash }} style={[styles.image, { height, width }]} source={{ uri: image }} contentFit={imageMode} />
      ) : (
        <View style={[styles.image, { height, width }, style]}>
          <Icon name={icon} color={iconColor || colors.accent} size={width - 5} />
        </View>
      )}
    </Touchable>
  )
}

const styles = StyleSheet.create({
  image: { borderRadius: layout.borderRadius, justifyContent: 'center' }
})
