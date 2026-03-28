/**
 * SwipeableModal
 *
 * Modal that responds to vertical pan gestures; swipe down to dismiss.
 *
 * Example:
 *   <SwipeableModal visible={open} onClose={close}>
 *     <CameraView />
 *   </SwipeableModal>
 */
import { type ReactNode, useEffect, useState } from 'react'
import { Modal, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { ModalProps, Portal } from 'react-native-paper'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import { colors, layout } from '../constants'

// We'll use Reanimated shared values and worklets for smooth UI-thread animations.

/**
 * Props for {@link SwipeableModal}.
 *
 * @property children - Modal content.
 * @property onClose - Called when user swipes down to dismiss.
 */
export type SwipeableModalProps = {
  children: ReactNode
  onClose: () => void
} & Omit<ModalProps, 'theme'>

export const SwipeableModal = (props: SwipeableModalProps) => {
  const [isClosing, setIsClosing] = useState(false)
  const translateY = useSharedValue(0)

  const windowHeight = layout.window.height

  // Build a Pan gesture using the new API. Update translateY during the
  // gesture and handle dismissal on end.
  const threshold = 100
  const velocityThreshold = 1000 // px/s
  const closeRequested = useSharedValue(0)

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      'worklet'
      // clamp translation to window bounds for safety
      const y = e.translationY ?? 0
      const clamped = Math.max(-windowHeight, Math.min(windowHeight, y))
      translateY.value = clamped
    })
    .onEnd((e) => {
      'worklet'
      const translationY = e.translationY ?? 0
      const velocityY = e.velocityY ?? 0
      const flingDown = velocityY > velocityThreshold
      const flingUp = velocityY < -velocityThreshold

      if (translationY > threshold || flingDown) {
        // mark that JS should handle closing and animate off-screen on UI thread
        closeRequested.value = 1
        translateY.value = withSpring(windowHeight, { velocity: velocityY, overshootClamping: true })
      } else if (translationY < -threshold || flingUp) {
        closeRequested.value = 1
        translateY.value = withSpring(-windowHeight, { velocity: velocityY, overshootClamping: true })
      } else {
        // spring back
        translateY.value = withSpring(0, { overshootClamping: false })
      }
    })

  // JS-side watcher: when a worklet sets `closeRequested.value = 1` we
  // observe it here and call props.onClose() once the UI spring finishes.
  useEffect(() => {
    let polling = false
    let pollHandle: number | null = null
    const interval = setInterval(() => {
      if (closeRequested.value === 1 && !polling) {
        polling = true
        // reflect closing state in JS so Modal animationType toggles
        setIsClosing(true)
        const start = Date.now()
        pollHandle = window.setInterval(() => {
          const y = translateY.value
          // consider the spring finished when the translate reaches the
          // off-screen target (or after a timeout fallback)
          if (Math.abs(y) >= windowHeight - 1 || Date.now() - start > 1500) {
            if (pollHandle) {
              clearInterval(pollHandle)
              pollHandle = null
            }
            // notify parent and reset after a tick so Modal can unmount
            props.onClose()
            setTimeout(() => {
              translateY.value = 0
              setIsClosing(false)
              closeRequested.value = 0
              polling = false
            }, 0)
          }
        }, 16)
      }
    }, 50)
    return () => {
      clearInterval(interval)
      if (pollHandle) clearInterval(pollHandle)
    }
  }, [closeRequested, translateY, windowHeight, props])

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }))

  return (
    // While we run our exit animation we set animationType to 'none' so the
    // native Modal doesn't animate its own exit which can conflict visually.
    // Use presentationStyle='overFullScreen' so the native modal doesn't draw
    // an opaque background behind our animated content (prevents black flash)
    // and statusBarTranslucent to help on Android.
    <Modal animationType={isClosing ? 'none' : 'slide'} transparent presentationStyle='overFullScreen' statusBarTranslucent {...props}>
      <Portal.Host>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.container, animatedStyle]}>{props.children}</Animated.View>
        </GestureDetector>
      </Portal.Host>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    // Ensure the modal background remains transparent while animating out so
    // the underlying app view is visible instead of a black window background.
    backgroundColor: colors.transparent,
    flex: 1
  }
})
