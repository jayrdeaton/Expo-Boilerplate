type Image = { id?: string; value?: string; blurhash?: string }
import { Image as ExpoImage } from 'expo-image'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { GestureResponderEvent, ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { config, layout } from '../constants'
import { useSettings, useTheme } from '../hooks'
import { ImageCaptureButton } from './ImageCaptureButton'
import { ImageModal } from './ImageModal'
import { ImagePickButton } from './ImagePickButton'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'
import { Row } from './Row'
import { Surface } from './Surface'
import { Touchable } from './Touchable'

const imageWidth = (layout.window.width - 8) / 3
const imageHeight = imageWidth * 1.5
const panelHeight = imageHeight + 4

export type ImagesInputProps = {
  editable?: boolean
  facing?: 'front' | 'back'
  onChange: (images: Image[]) => void
  style?: ViewStyle
  value?: Image[]
}

const ImagesInputInner = ({ editable = true, facing, onChange, style, value: data }: ImagesInputProps) => {
  const { imageMode } = useSettings()
  const { theme } = useTheme()
  const scrollView = useRef<ScrollView | null>(null)
  const [images, setImages] = useState(data || [])
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })
  const [menu, setMenu] = useState(false)
  const [menuItem, setMenuItem] = useState<Image>()
  const [modal, setModal] = useState(false)
  const [modalItem, setModalItem] = useState<Image>()
  useEffect(() => setImages(data ? [...data] : []), [data])
  const handleDefault = useCallback(() => {
    if (!menuItem) return
    const _images = images.filter((i) => i.id !== menuItem.id)
    _images.unshift(menuItem)
    setImages(_images)
    onChange(_images)
  }, [images, menuItem, onChange])
  const handleDelete = useCallback(() => {
    const _images = images.filter((i) => i !== menuItem)
    setImages(_images)
    onChange(_images)
  }, [images, menuItem, onChange])
  const handleDismiss = useCallback(() => setModal(false), [])
  const handleMenu = useCallback(() => setMenu((m) => !m), [])
  const handleImages = useCallback(
    (incoming: Image[]) => {
      if (!incoming?.length) return
      const _images = [...images, ...incoming]
      setImages(_images)
      onChange(_images)
      setTimeout(() => scrollView.current?.scrollToEnd(), 250)
    },
    [images, onChange]
  )
  const handleLongPress = useCallback((item: Image, { nativeEvent: { pageX: x, pageY: y } }: GestureResponderEvent) => {
    setAnchor({ x, y })
    setMenuItem(item)
    setMenu(true)
  }, [])
  const handlePress = useCallback((item: Image) => {
    setModal(true)
    setModalItem(item)
  }, [])
  const renderActions = useCallback(
    (compact?: boolean) => (
      <View style={[styles.actionsTile, { backgroundColor: theme.colors.tertiaryContainer, borderColor: theme.colors.tertiary }, compact && styles.actionsTileCompact]}>
        <Text style={[styles.actionsTitle, { color: theme.colors.onTertiaryContainer }]}>Add</Text>
        <Row style={styles.actionsRow}>
          <ImagePickButton disabled={editable === false} mode='contained-tonal' onChange={handleImages} />
          <ImageCaptureButton disabled={editable === false} facing={facing} mode='contained-tonal' onChange={handleImages} />
        </Row>
      </View>
    ),
    [editable, facing, handleImages, theme.colors.onTertiaryContainer, theme.colors.tertiary, theme.colors.tertiaryContainer]
  )
  const renderImage = useCallback(
    (i: Image, index: number) => (
      <Touchable key={index} onLongPress={(e) => handleLongPress(i, e)} onPress={() => handlePress(i)} style={styles.imageWrapper}>
        <ExpoImage contentFit={imageMode} key={index} placeholder={{ blurhash: i.blurhash }} source={{ uri: i.value || '' }} style={styles.image} transition={config.imageTransition} />
      </Touchable>
    ),
    [handleLongPress, handlePress, imageMode]
  )
  return (
    <Surface elevation={4} style={style} title='Images'>
      <Menu anchor={anchor} onDismiss={handleMenu} visible={menu}>
        <MenuItem onDismiss={handleMenu} onPress={handleDefault} title='Set Default' />
        <MenuItem onDismiss={handleMenu} onPress={handleDelete} title='Delete' />
      </Menu>
      <ImageModal image={modalItem?.value} onDismiss={handleDismiss} visible={modal} />
      <View style={styles.content}>
        <View style={styles.panel}>
          {images.length > 0 ? (
            <ScrollView centerContent horizontal ref={scrollView} decelerationRate={0} snapToInterval={imageWidth} snapToAlignment={'start'} contentContainerStyle={styles.scrollView}>
              {images.map(renderImage)}
              <View style={styles.imageWrapper}>{renderActions(true)}</View>
            </ScrollView>
          ) : (
            <View style={styles.emptyState}>{renderActions()}</View>
          )}
        </View>
      </View>
    </Surface>
  )
}
const styles = StyleSheet.create({
  actionsRow: { justifyContent: 'center', width: '100%' },
  actionsTile: {
    alignItems: 'center',
    borderRadius: layout.borderRadius,
    borderStyle: 'dashed',
    borderWidth: 1,
    height: imageHeight,
    justifyContent: 'center',
    paddingHorizontal: 8,
    width: imageWidth
  },
  actionsTileCompact: {
    height: '100%',
    paddingHorizontal: 4,
    width: '100%'
  },
  actionsTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4
  },
  content: {
    gap: 4,
    paddingHorizontal: 2,
    paddingTop: 0
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  image: { borderRadius: layout.borderRadius, height: '100%', width: '100%' },
  imageWrapper: { height: imageHeight, padding: 2, width: imageWidth },
  panel: {
    borderRadius: layout.borderRadius,
    height: panelHeight,
    justifyContent: 'flex-start',
    overflow: 'hidden'
  },
  scrollView: { alignItems: 'center', justifyContent: 'center', minWidth: '100%', paddingRight: 2 }
})

export const ImagesInput = memo(ImagesInputInner) as typeof ImagesInputInner
