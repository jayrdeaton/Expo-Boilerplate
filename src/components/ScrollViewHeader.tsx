import { type ReactNode, useContext } from 'react'
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useSettings } from '../hooks'
import { BlurView } from './BlurView'
import { ScrollViewContext } from './ScrollViewProvider'

export type ScrollViewHeaderProps = {
  children: ReactNode | ReactNode[]
  style?: ViewStyle
}

export const ScrollViewHeader = ({ children, style }: ScrollViewHeaderProps) => {
  const { headerHeight, setHeaderHeight, progress, progressing, scrollPosition } = useContext(ScrollViewContext)
  const insets = useSafeAreaInsets()
  const { headerLock } = useSettings()
  const handleLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }: LayoutChangeEvent) => {
    if (headerHeight !== height) setHeaderHeight(height)
  }
  const blurStyle = useAnimatedStyle(() => {
    if (headerLock || scrollPosition.value < 0) return { transform: [{ translateY: 0 }] }
    const minimumY = headerHeight - insets.top
    const translateY = scrollPosition.value > minimumY ? -minimumY : -scrollPosition.value
    return { transform: [{ translateY }] }
  }, [headerHeight, headerLock, insets.top])
  const headerStyle = useAnimatedStyle(() => {
    if (headerLock || scrollPosition.value < 0) return { transform: [{ translateY: 0 }] }
    const translateY = scrollPosition.value < 0 ? 0 : -scrollPosition.value
    return { transform: [{ translateY }] }
  }, [headerHeight, headerLock, insets.top])
  const progressStyle = useAnimatedStyle(() => {
    if (headerLock || scrollPosition.value < 0) return { transform: [{ translateY: 0 }] }
    const minimumY = headerHeight - insets.top - 4
    const translateY = scrollPosition.value > minimumY ? -minimumY : -scrollPosition.value
    return { transform: [{ translateY }] }
  }, [headerHeight, headerLock, insets.top])
  return (
    <View onLayout={handleLayout} pointerEvents='box-none' style={styles.header}>
      {!headerLock && <BlurView style={[styles.blur, { height: insets.top }]} />}
      <Animated.View style={[StyleSheet.absoluteFill, blurStyle]}>
        <BlurView style={StyleSheet.absoluteFill} />
      </Animated.View>
      <Animated.View style={[{ paddingTop: insets.top }, style, headerStyle]}>
        <View style={styles.row}>{children}</View>
      </Animated.View>
      <Animated.View style={progressStyle}>
        <ProgressBar indeterminate={progress === null} visible={progressing} progress={progress} style={styles.progress} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  blur: { position: 'absolute', width: '100%', zIndex: 2 },
  header: { zIndex: 1 },
  progress: { height: 4, marginBottom: -4 },
  row: { alignItems: 'center', flexDirection: 'row', zIndex: 1 }
})
