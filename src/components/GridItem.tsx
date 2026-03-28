import { Image } from 'expo-image'
import { memo, useCallback, useMemo } from 'react'
import { GestureResponderEvent, StyleSheet, View, ViewStyle } from 'react-native'
import { Checkbox } from 'react-native-paper'

import { config, layout } from '../constants'
import { useSettings, useTheme } from '../hooks'
import { Generic, ThemeVariant } from '../types'
import { getPrimaryImage, getVariantColors } from '../utils'
import { Badge } from './Badge'
import { ClipText } from './ClipText'
import { Icon } from './Icon'
import { Overlay } from './Overlay'
import { Touchable } from './Touchable'

export type GridItemProps<T> = {
  badge?: number
  columns: number
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

const GridItemInner = <T extends Partial<Generic>>({ badge, columns, icon, iconColor, image, item, onLongPress, onPress, selected, style, title, variant }: GridItemProps<T>) => {
  const { imageMode } = useSettings()
  const { theme } = useTheme()
  const colors = useMemo(() => getVariantColors(theme, variant), [theme, variant])
  const handleLongPress = useCallback((event: GestureResponderEvent) => onLongPress?.(item as T, event), [onLongPress, item])
  const handlePress = useCallback(() => onPress?.(item as T), [onPress, item])
  const primaryImage = useMemo(() => getPrimaryImage(item.images), [item.images])
  const { width, height, displayImage, displayTitle } = useMemo(() => {
    const w = layout.window.width / columns
    return { width: w, height: w * 1.4, displayImage: image || primaryImage?.value || null, displayTitle: title || item.title || null }
  }, [columns, image, item.title, primaryImage?.value, title])
  const { iconSize, fontSize, fontWeight, paddingTop, titleMaxHeight }: { iconSize: number; fontSize: number; fontWeight: '100' | 'normal'; paddingTop: number; titleMaxHeight: number } = useMemo(() => {
    const iconSize = width / 4
    const fontSize = iconSize / (3 / 2)
    const fontWeight = !displayTitle ? '100' : 'normal'
    const paddingTop = iconSize
    const titleMaxHeight = Math.max(0, height - iconSize - paddingTop)
    return { iconSize, fontSize, paddingTop, titleMaxHeight, fontWeight }
  }, [width, displayTitle, height])
  const finalTitle = displayTitle || 'Missing Title'
  return (
    <Touchable onLongPress={onLongPress ? handleLongPress : undefined} onPress={onPress ? handlePress : undefined} style={[{ backgroundColor: theme.colors.surface, height, width, borderColor: theme.colors.outlineVariant, borderWidth: StyleSheet.hairlineWidth }, style]}>
      <View style={styles.wrapper}>
        {displayImage ? (
          <Image transition={config.imageTransition} style={styles.image} source={{ uri: displayImage }} placeholder={{ blurhash: primaryImage?.blurhash }} contentFit={imageMode} />
        ) : (
          <View style={[styles.flex, { paddingTop }]}>
            <Icon name={icon} color={iconColor || colors.accent} size={iconSize} style={styles.icon} />
            <ClipText style={[styles.title, { fontSize, fontWeight }]} maxHeight={titleMaxHeight}>
              {finalTitle}
            </ClipText>
          </View>
        )}
        {selected === true ? (
          <Overlay style={styles.checkbox}>
            <Checkbox status={selected === true ? 'checked' : 'unchecked'} />
          </Overlay>
        ) : null}
        {badge !== undefined ? <Badge style={styles.badge}>{badge}</Badge> : null}
      </View>
    </Touchable>
  )
}
const styles = StyleSheet.create({
  badge: { position: 'absolute', right: 0, top: 0 },
  checkbox: { position: 'absolute', right: 0, top: 0 },
  flex: { flex: 1 },
  icon: {},
  image: { alignItems: 'center', height: '100%', justifyContent: 'center', width: '100%' },
  title: { padding: 3, textAlign: 'center' },
  wrapper: { alignItems: 'center', flex: 1, justifyContent: 'center' }
})

export const GridItem = memo(GridItemInner) as typeof GridItemInner
