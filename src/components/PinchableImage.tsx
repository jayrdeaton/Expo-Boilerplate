import { Image as RNImage, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

export type PinchableImageProps = {
  image: string
  style?: ViewStyle
}

export const PinchableImage = ({ image, style }: PinchableImageProps) => {
  // shared values for smooth UI-thread animation
  const scale = useSharedValue(1)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const panOffsetX = useSharedValue(0)
  const panOffsetY = useSharedValue(0)
  const scaleOffset = useSharedValue(0) // cumulative offset
  const panEnabled = useSharedValue(false)

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      'worklet'
      const s = typeof e.scale === 'number' ? e.scale : NaN
      if (!isFinite(s)) return
      scale.value = s + scaleOffset.value
    })
    .onEnd((e) => {
      'worklet'
      const s = typeof e.scale === 'number' ? e.scale : 1
      scaleOffset.value = s - 1 + scaleOffset.value
      if (scaleOffset.value < 0) {
        scaleOffset.value = 0
        panEnabled.value = false
        scale.value = withSpring(1)
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
      } else if (scaleOffset.value > 0) {
        panEnabled.value = true
      }
    })

  const pan = Gesture.Pan()
    .onStart(() => {
      'worklet'
      // record current offsets so translation is relative to the start
      panOffsetX.value = translateX.value
      panOffsetY.value = translateY.value
    })
    .onUpdate((e) => {
      'worklet'
      if (!panEnabled.value) return
      const tx = typeof e.translationX === 'number' ? e.translationX : 0
      const ty = typeof e.translationY === 'number' ? e.translationY : 0
      translateX.value = panOffsetX.value + tx
      translateY.value = panOffsetY.value + ty
    })
    .onEnd(() => {
      'worklet'
      // persist offsets after gesture ends
      panOffsetX.value = translateX.value
      panOffsetY.value = translateY.value
    })

  const gesture = Gesture.Simultaneous(pan, pinch)

  // @ts-expect-error - worklet style typing for transform is noisy across RN types; runtime is correct
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }]
    }
  })

  return (
    <View style={style}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <RNImage source={{ uri: image }} style={styles.image} resizeMode='contain' />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create<{ container: ViewStyle; image: ImageStyle }>({
  container: {
    height: '100%',
    width: '100%'
  },
  image: {
    height: '100%',
    width: '100%'
  }
})
