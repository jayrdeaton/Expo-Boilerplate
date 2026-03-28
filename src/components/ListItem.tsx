import { memo, useCallback, useMemo } from 'react'
import { GestureResponderEvent, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'

import { defaults } from '../constants'
import { useTheme } from '../hooks'
import { Generic, ThemeVariant } from '../types'
import { getPrimaryImage, getVariantColors } from '../utils'
import { ImageOrIcon } from './ImageOrIcon'
import { TextAndCaption } from './TextAndCaption'
import { Touchable } from './Touchable'

export type ListItemProps<T> = {
  createdAt?: boolean
  caption?: string | null
  captionVariant?: 'displayLarge' | 'displayMedium' | 'displaySmall' | 'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' | 'titleSmall' | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall'
  icon: string
  iconColor?: string
  item?: T
  onLongPress?: (item: T, event: GestureResponderEvent) => void
  onPress?: (item: T, event: GestureResponderEvent) => void
  selected?: boolean
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle
  title?: string | null
  titleVariant?: 'displayLarge' | 'displayMedium' | 'displaySmall' | 'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' | 'titleSmall' | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall'
  variant?: ThemeVariant
}

const ListItemInner = <T extends Partial<Generic>>({ caption, captionVariant, icon, iconColor, item, onLongPress, onPress, selected, style, textStyle, title, titleVariant, variant }: ListItemProps<T>) => {
  const { theme } = useTheme()
  const colors = useMemo(() => getVariantColors(theme, variant), [theme, variant])
  const handleLongPress = useCallback((event: GestureResponderEvent) => onLongPress?.(item as T, event), [onLongPress, item])
  const handlePress = useCallback((event: GestureResponderEvent) => onPress?.(item as T, event), [onPress, item])
  const _title = useMemo(() => title || item?.title || defaults.noTitle, [title, item])
  const _caption = useMemo(() => caption || item?.sku || (item?.updatedAt ? `Updated: ${new Date(item?.updatedAt).toLocaleDateString()}` : null), [caption, item])
  const primaryImage = useMemo(() => getPrimaryImage(item?.images), [item?.images])
  return (
    <Touchable style={[styles.item, style, { backgroundColor: selected ? colors.container : undefined }]} onLongPress={onLongPress ? handleLongPress : undefined} onPress={onPress ? handlePress : undefined} variant={variant}>
      <View style={styles.row}>
        {/* {selected === true || selected === false ? <Checkbox status={selected === true ? 'checked' : 'unchecked'} /> : null} */}
        <ImageOrIcon blurhash={primaryImage?.blurhash} icon={icon} iconColor={iconColor} image={primaryImage?.value} style={styles.image} variant={variant} />
        <TextAndCaption caption={_caption} captionVariant={captionVariant} textStyle={textStyle} text={_title} textVariant={titleVariant} style={styles.text} />
      </View>
    </Touchable>
  )
}
const styles = StyleSheet.create({
  image: {
    marginRight: 4
  },
  item: {
    justifyContent: 'center',
    padding: 4
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    flex: 1
  }
})

export const ListItem = memo(ListItemInner) as typeof ListItemInner
