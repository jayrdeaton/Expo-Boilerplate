import { Image as ExpoImage } from 'expo-image'

import { AppImage } from '../types'
import { memo, useCallback, useContext, useMemo, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Surface, Text } from 'react-native-paper'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

import { config, icons, layout } from '../constants'
import { useSettings, useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import { ImageModal } from './ImageModal'
import { LazyPager } from './LazyPager'
import { Overlay } from './Overlay'
import { PagerContext, PagerProvider } from './PagerProvider'
import { ScrollViewContext } from './ScrollViewProvider'
import { Touchable } from './Touchable'

const imageWidth = layout.window.width
const imageHeight = imageWidth * 1.5

export type ImagesPanelProps<T> = {
  icon?: string
  item?: T
  style?: ViewStyle
  title: string
  variant?: ThemeVariant
}

const ImagesPanelInner = <T extends { images: AppImage[] }>({ icon, item, style, title, variant }: ImagesPanelProps<T>) => {
  const { pagerIndex, pagerRef } = useContext(PagerContext)
  const { scrollPosition, headerHeight } = useContext(ScrollViewContext) || {}
  const { imageMode } = useSettings()
  const { theme } = useTheme()
  const colors = getVariantColors(theme, variant)
  const [modal, setModal] = useState(false)
  const [modalItem, setModalItem] = useState<AppImage>()
  const parallaxFactor = 0.5

  const parallaxStyle = useAnimatedStyle(() => {
    const y = scrollPosition ? scrollPosition.value + headerHeight : 0
    return { transform: [{ translateY: y * (1 - parallaxFactor) }] }
  })

  const images = useMemo(() => item?.images || [], [item?.images])

  const handleBack = useCallback(() => {
    pagerRef.current?.setPage(Math.max(pagerIndex.current - 1, 0))
  }, [pagerIndex, pagerRef])

  const handleForward = useCallback(() => {
    pagerRef.current?.setPage(Math.min(pagerIndex.current + 1, images.length - 1))
  }, [pagerIndex, pagerRef, images.length])

  const handlePress = useCallback((image: AppImage) => {
    setModalItem(image)
    requestAnimationFrame(() => {
      setModal(true)
    })
  }, [])

  const renderImage = useCallback(
    (image: AppImage, index: number) => {
      const placeholder = image.blurhash ? { blurhash: image.blurhash } : undefined

      return (
        <Touchable key={index} style={styles.imageWrapper} onPress={() => handlePress(image)}>
          <Surface style={styles.imageSurface}>
            <ExpoImage transition={config.imageTransition} placeholder={placeholder} source={{ uri: image.value || '' }} style={styles.image} contentFit={imageMode} />
          </Surface>
        </Touchable>
      )
    },
    [handlePress, imageMode]
  )
  return (
    <View style={style}>
      <Animated.View style={[styles.pagerContainer, parallaxStyle]}>
        <LazyPager style={styles.pager} initialPage={0} scrollEnabled={false} offscreenPageLimit={0}>
          {images.length ? (
            images.map(renderImage)
          ) : (
            <View key='empty' style={styles.imageWrapper}>
              <Surface style={[styles.imageSurface, { backgroundColor: theme.colors.surface }]}>
                <Icon color={colors.accent} size={50} name={`${icon}-outline`} />
                <Text variant='headlineLarge' style={styles.title}>
                  {title}
                </Text>
              </Surface>
            </View>
          )}
        </LazyPager>
        {images.length > 1 && (
          <Overlay opacity={0.5} style={styles.dotsOverlay}>
            <View style={styles.dotsRow} pointerEvents='box-none'>
              <IconButton icon={icons.back} iconColor={colors.accent} onPress={handleBack} />
              <View style={styles.dots}>
                {images.map((_, index) => (
                  <Touchable key={index} onPress={() => pagerRef.current?.setPage(index)}>
                    <View style={[styles.dot, { backgroundColor: index === pagerIndex.current ? colors.accent : colors.container }]} />
                  </Touchable>
                ))}
              </View>
              <IconButton icon={icons.forward} iconColor={colors.accent} onPress={handleForward} />
            </View>
          </Overlay>
        )}
      </Animated.View>
      <ImageModal image={modalItem?.value} onDismiss={() => setModal(false)} visible={modal} />
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: 6,
    height: 12,
    marginHorizontal: 6,
    width: 12
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  dotsOverlay: {
    bottom: 0,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0
  },
  dotsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  image: {
    borderRadius: layout.borderRadius,
    height: '100%',
    width: '100%'
  },
  imageSurface: {
    alignItems: 'center',
    borderRadius: layout.borderRadius,
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  imageWrapper: {
    height: imageHeight,
    padding: 2,
    width: imageWidth
  },
  pager: {
    height: '100%',
    width: '100%'
  },
  pagerContainer: {
    alignSelf: 'center',
    height: imageHeight,
    position: 'relative',
    width: imageWidth
  },
  title: {
    textAlign: 'center'
  }
})

const WrappedImagesPanelInner = (props: ImagesPanelProps<{ images: AppImage[] }>) => (
  <PagerProvider>
    <ImagesPanelInner {...props} />
  </PagerProvider>
)

export const ImagesPanel = memo(WrappedImagesPanelInner) as typeof ImagesPanelInner
