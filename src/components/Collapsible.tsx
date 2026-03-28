import { type ReactNode, useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export type CollapsibleProps = {
  children?: ReactNode
  style?: ViewStyle
  visible: boolean
}

export const Collapsible = ({ children, style, visible }: CollapsibleProps) => {
  const [contentHeight, setContentHeight] = useState(0)
  const [isMeasured, setIsMeasured] = useState(false)
  const animatedHeight = useSharedValue(visible ? 999999 : 0)

  useEffect(() => {
    if (isMeasured && contentHeight > 0) {
      if (visible) {
        animatedHeight.value = withTiming(contentHeight)
      } else {
        animatedHeight.value = withTiming(0)
      }
    }
  }, [visible, contentHeight, isMeasured, animatedHeight])

  const handleLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }: LayoutChangeEvent) => {
    if (height > 0 && height !== contentHeight) {
      setContentHeight(height)
      if (!isMeasured) {
        setIsMeasured(true)
        animatedHeight.value = visible ? height : 0
      }
    }
  }

  const animatedStyle = useAnimatedStyle(
    () => ({
      height: animatedHeight.value
    }),
    []
  )

  return (
    <Animated.View style={[styles.hidden, animatedStyle, style]}>
      <View onLayout={handleLayout} style={styles.content}>
        {children}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  content: { position: 'absolute', width: '100%' },
  hidden: { overflow: 'hidden' }
})
