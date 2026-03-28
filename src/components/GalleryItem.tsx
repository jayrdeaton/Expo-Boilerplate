import { Image } from 'expo-image'
import { memo, useCallback, useContext, useMemo } from 'react'
import { GestureResponderEvent, StyleSheet, View, ViewStyle } from 'react-native'
import { Surface, Text } from 'react-native-paper'

import { config, layout } from '../constants'
import { useSettings, useTheme } from '../hooks'
import { Generic, ThemeVariant } from '../types'
import { getPrimaryImage, getVariantColors } from '../utils'
import { IconButton } from './IconButton'
import { ScrollViewContext } from './ScrollViewProvider'
import { Touchable } from './Touchable'

export type GalleryItemProps<T> = {
  icon: string
  iconColor?: string
  item: T
  image?: string
  onLongPress?: (item: T, event: GestureResponderEvent) => void
  onPress?: (item: T) => void
  selected?: boolean
  style?: ViewStyle
  title?: string | null
  variant?: ThemeVariant
}

const GalleryItemInner = <T extends Partial<Generic>>({ icon, iconColor, image, item, onLongPress, onPress, selected, style, title, variant }: GalleryItemProps<T>) => {
  const { imageMode } = useSettings()
  const { theme } = useTheme()
  const { scrollHeight: height } = useContext(ScrollViewContext)
  const colors = useMemo(() => getVariantColors(theme, variant), [theme, variant])
  const handleLongPress = useCallback((event: GestureResponderEvent) => onLongPress?.(item as T, event), [onLongPress, item])
  const handlePress = useCallback(() => onPress?.(item as T), [onPress, item])
  const primaryImage = useMemo(() => getPrimaryImage(item.images), [item.images])
  const { _image, _title } = useMemo(() => ({ _image: image || primaryImage?.value || null, _title: title || item.title || null }), [image, item.title, primaryImage?.value, title])
  return (
    <Touchable onLongPress={onLongPress ? handleLongPress : undefined} onPress={onPress ? handlePress : undefined} style={[styles.wrapper, style, { borderColor: selected ? colors.accent : 'transparent', borderWidth: selected ? 3 : 0, height }]}>
      <View style={StyleSheet.absoluteFill}>
        {_image ? (
          <Image contentFit={imageMode} placeholder={{ blurhash: primaryImage?.blurhash }} style={styles.image} source={{ uri: _image }} transition={config.imageTransition} />
        ) : (
          <View style={styles.image}>
            <IconButton icon={icon} iconColor={iconColor || colors.accent} size={layout.window.width / 2} style={styles.icon} />
          </View>
        )}
        <Surface style={styles.surface}>
          <Text numberOfLines={2} variant='headlineLarge' style={styles.title}>
            {_title}
          </Text>
        </Surface>
      </View>
    </Touchable>
  )
}
const styles = StyleSheet.create({
  icon: { paddingBottom: 20 },
  image: {
    alignItems: 'center',
    flex: 1,
    // height: '100%',
    justifyContent: 'center'
    // width: '100%'
  },
  surface: { height: 100, justifyContent: 'center' },
  title: { padding: 3, textAlign: 'center' },
  wrapper: {
    // height: '100%',
    width: layout.window.width
    // alignItems: 'center',
    // justifyContent: 'center',
  }
})

export const GalleryItem = memo(GalleryItemInner) as typeof GalleryItemInner
