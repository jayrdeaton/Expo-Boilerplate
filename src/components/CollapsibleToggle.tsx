import { type ReactNode, useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export type CollapsibleToggleProps = {
  primaryChildren?: ReactNode
  secondaryChildren?: ReactNode
  style?: ViewStyle
  visible: boolean
}

export const CollapsibleToggle = ({ primaryChildren, secondaryChildren, style, visible }: CollapsibleToggleProps) => {
  const [primaryHeight, setPrimaryHeight] = useState(0)
  const [secondaryHeight, setSecondaryHeight] = useState(0)
  const [isMeasured, setIsMeasured] = useState(false)
  const animatedHeight = useSharedValue(0)

  useEffect(() => {
    if (isMeasured && primaryHeight > 0 && secondaryHeight > 0) {
      if (visible) {
        animatedHeight.value = withTiming(primaryHeight)
      } else {
        animatedHeight.value = withTiming(secondaryHeight)
      }
    }
  }, [visible, primaryHeight, secondaryHeight, isMeasured, animatedHeight])

  const handlePrimaryLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }: LayoutChangeEvent) => {
    if (height > 0 && height !== primaryHeight) {
      setPrimaryHeight(height)
      if (!isMeasured && secondaryHeight > 0) {
        setIsMeasured(true)
        animatedHeight.value = visible ? height : secondaryHeight
      }
    }
  }

  const handleSecondaryLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }: LayoutChangeEvent) => {
    if (height > 0 && height !== secondaryHeight) {
      setSecondaryHeight(height)
      if (!isMeasured && primaryHeight > 0) {
        setIsMeasured(true)
        animatedHeight.value = visible ? primaryHeight : height
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
    <Animated.View style={[isMeasured && styles.hidden, animatedStyle, style]}>
      <View onLayout={handlePrimaryLayout} style={styles.content}>
        {primaryChildren}
      </View>
      <View onLayout={handleSecondaryLayout} style={styles.content}>
        {secondaryChildren}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  content: { position: 'absolute', width: '100%' },
  hidden: { overflow: 'hidden' }
})
