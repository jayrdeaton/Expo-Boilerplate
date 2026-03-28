import { type ReactNode, useContext } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useSettings } from '../hooks'
import { BlurView } from './BlurView'
import { ScrollViewContext } from './ScrollViewProvider'

export type ScrollViewFooterProps = {
  children: ReactNode | ReactNode[]
  style?: ViewStyle
}

export const ScrollViewFooter = ({ children, style }: ScrollViewFooterProps) => {
  const { footerHeight, setFooterHeight, progress, progressing, scrollPosition } = useContext(ScrollViewContext)
  const insets = useSafeAreaInsets()
  const { footerLock } = useSettings()
  const handleLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }: LayoutChangeEvent) => {
    if (footerHeight !== height) setFooterHeight(height)
  }
  const blurStyle = useAnimatedStyle(() => {
    if (footerLock || scrollPosition.value < 0) return { transform: [{ translateY: 0 }] }
    const maximumY = footerHeight - insets.bottom
    const translateY = scrollPosition.value > maximumY ? maximumY : scrollPosition.value
    return { transform: [{ translateY }] }
  }, [footerHeight, footerLock, insets.bottom])
  const footerStyle = useAnimatedStyle(() => {
    if (footerLock || scrollPosition.value < 0) return { transform: [{ translateY: 0 }] }
    const maximumY = footerHeight
    const translateY = scrollPosition.value > maximumY ? maximumY : scrollPosition.value
    return { transform: [{ translateY }] }
  }, [footerHeight, footerLock, insets.bottom])
  const progressStyle = useAnimatedStyle(() => {
    if (footerLock || scrollPosition.value < 0) return { transform: [{ translateY: 0 }] }
    const maximumY = footerHeight - insets.bottom - 4
    const translateY = scrollPosition.value > maximumY ? maximumY : scrollPosition.value
    return { transform: [{ translateY }] }
  }, [footerHeight, footerLock, insets.bottom])
  return (
    <View onLayout={handleLayout} pointerEvents='box-none' style={styles.footer}>
      <Animated.View style={[StyleSheet.absoluteFill, blurStyle]}>
        <BlurView style={StyleSheet.absoluteFill} />
      </Animated.View>
      <Animated.View style={progressStyle}>
        <ProgressBar indeterminate={progress === null} visible={progressing} progress={progress} style={styles.progress} />
      </Animated.View>
      <Animated.View style={[styles.row, { paddingBottom: insets.bottom }, style, footerStyle]}>{children}</Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: { bottom: 0, left: 0, position: 'absolute', right: 0, zIndex: 2 },
  progress: { height: 4, marginTop: -4 },
  row: { alignItems: 'center', flexDirection: 'row', zIndex: 1 }
})
