import { memo, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LayoutChangeEvent, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Portal } from 'react-native-paper'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'

import { layout } from '../constants'
import { useTheme } from '../hooks'

const defaultActionWidth = 88
const velocityThreshold = 700

type Bounds = {
  height: number
  width: number
  x: number
  y: number
}

export type SwipeActionRowProps = {
  action: ReactNode
  actionWidth?: number
  children: ReactNode
  closeOnPressAway?: boolean
  contentStyle?: StyleProp<ViewStyle>
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
  style?: StyleProp<ViewStyle>
}

const SwipeActionRowInner = ({ action, actionWidth = defaultActionWidth, children, closeOnPressAway = true, contentStyle, disabled, onOpenChange, open = false, style }: SwipeActionRowProps) => {
  const { theme } = useTheme()
  const containerRef = useRef<View>(null)
  const [bounds, setBounds] = useState<Bounds>()
  const offsetX = useSharedValue(0)
  const startOffsetX = useSharedValue(0)
  const openThreshold = actionWidth * 0.5

  const measureBounds = useCallback(() => {
    containerRef.current?.measureInWindow((x, y, width, height) => {
      setBounds({ x, y, width, height })
    })
  }, [])

  useEffect(() => {
    const nextValue = open ? -actionWidth : 0
    startOffsetX.value = nextValue
    offsetX.value = withSpring(nextValue, { overshootClamping: true })
    if (open && closeOnPressAway) {
      const timeout = setTimeout(measureBounds, 0)
      return () => clearTimeout(timeout)
    }
  }, [actionWidth, closeOnPressAway, measureBounds, offsetX, open, startOffsetX])

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: offsetX.value }] }))

  const handleLayout = useCallback(
    (_event: LayoutChangeEvent) => {
      if (open) measureBounds()
    },
    [measureBounds, open]
  )
  const handlePressAway = useCallback(() => onOpenChange?.(false), [onOpenChange])

  const gesture = useMemo(() => {
    const pan = Gesture.Pan()
      .enabled(disabled !== true)
      .activeOffsetX([-16, 16])
      .failOffsetY([-12, 12])
      .onBegin(() => {
        'worklet'
        startOffsetX.value = offsetX.value
      })
      .onUpdate((event) => {
        'worklet'
        const nextValue = Math.max(-actionWidth, Math.min(0, startOffsetX.value + (event.translationX ?? 0)))
        offsetX.value = nextValue
      })
      .onEnd((event) => {
        'worklet'
        const velocityX = event.velocityX ?? 0
        const shouldOpen = velocityX < -velocityThreshold || offsetX.value <= -openThreshold
        const nextValue = shouldOpen ? -actionWidth : 0
        offsetX.value = withSpring(nextValue, { overshootClamping: true, velocity: velocityX })
        startOffsetX.value = nextValue
        scheduleOnRN(onOpenChange, shouldOpen)
      })

    try {
      return Gesture.Simultaneous(pan, Gesture.Native())
    } catch {
      return pan
    }
  }, [actionWidth, disabled, offsetX, onOpenChange, openThreshold, startOffsetX])

  const overlays = useMemo(() => {
    if (!open || !closeOnPressAway || !bounds) return []
    const top = Math.max(0, bounds.y)
    const left = Math.max(0, bounds.x)
    const rightStart = Math.max(0, bounds.x + bounds.width)
    const bottomStart = Math.max(0, bounds.y + bounds.height)
    return [
      { key: 'top', style: { height: top, left: 0, right: 0, top: 0 } },
      { key: 'left', style: { height: bounds.height, left: 0, top, width: left } },
      { key: 'right', style: { bottom: layout.window.height - bottomStart, left: rightStart, right: 0, top } },
      { key: 'bottom', style: { bottom: 0, left: 0, right: 0, top: bottomStart } }
    ]
  }, [bounds, closeOnPressAway, open])

  return (
    <>
      <View ref={containerRef} onLayout={handleLayout} style={[styles.container, style]}>
        <View style={[styles.action, { width: actionWidth }]}>{action}</View>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.content, { backgroundColor: theme.colors.surface }, contentStyle, animatedStyle]}>{children}</Animated.View>
        </GestureDetector>
      </View>
      {overlays.length ? (
        <Portal>
          <View pointerEvents='box-none' style={StyleSheet.absoluteFill}>
            {overlays.map(({ key, style: overlayStyle }) => (
              <Pressable key={key} onPress={handlePressAway} style={[styles.overlay, overlayStyle]} />
            ))}
          </View>
        </Portal>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0
  },
  container: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  },
  content: {
    width: '100%',
    zIndex: 1
  },
  overlay: {
    position: 'absolute'
  }
})

export const SwipeActionRow = memo(SwipeActionRowInner) as typeof SwipeActionRowInner
