import { type ComponentRef, memo, type RefObject, useCallback, useContext, useMemo, useRef } from 'react'
import { ScrollViewProps as ReactScrollViewProps, StyleSheet, View } from 'react-native'
import { GestureDetector, GestureType } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { FAB } from './FAB'
import { RefreshControl } from './RefreshControl'
import { ScrollViewContext } from './ScrollViewProvider'

const fabWidth = 100
type KeyboardAwareScrollViewRef = ComponentRef<typeof KeyboardAwareScrollView>

export type ScrollViewProps = ReactScrollViewProps & {
  footerLock?: boolean
  gesture?: GestureType
  headerLock?: boolean
  onRefresh?: () => void
  ref?: RefObject<KeyboardAwareScrollViewRef>
  refreshing?: boolean
}

const ScrollViewInner = ({ children, footerLock, gesture, headerLock, onRefresh, refreshing, style, ...props }: ScrollViewProps) => {
  const insets = useSafeAreaInsets()
  const fabHidden = useSharedValue(1)
  const scrollHeight = useRef(0)
  const scrollView = useRef<KeyboardAwareScrollViewRef>(null)
  const { footerHeight, headerHeight, scrollPosition } = useContext(ScrollViewContext)
  const containerStyle = useMemo(() => [StyleSheet.absoluteFill, style], [style])
  const contentInset = useMemo(() => ({ bottom: headerLock ? footerHeight || insets.bottom : insets.bottom, top: headerHeight }), [headerLock, footerHeight, insets.bottom, headerHeight])
  const contentOffset = useMemo(() => ({ x: 0, y: -contentInset.top }), [contentInset.top])
  const fabStyle = useAnimatedStyle(() => {
    const opacity = fabHidden.value ? withTiming(0) : withTiming(1)
    const translateX = fabHidden.value ? withTiming(fabWidth) : withTiming(0)
    return { opacity, transform: [{ translateX }] }
  }, [])
  const fabTop = useMemo(() => (headerLock ? headerHeight : insets.top) + 4, [headerLock, headerHeight, insets.top])
  const handleContentSizeChange = useCallback(
    (w: number, h: number) => {
      scrollHeight.current = h
      if (props.onContentSizeChange) props.onContentSizeChange(w, h)
    },
    [props]
  )
  const handleScroll = useAnimatedScrollHandler(({ contentOffset: { y } }) => {
    scrollPosition.value = y
    fabHidden.value = y < 100 ? 1 : 0
  })
  const handleScrollToTop = useCallback(() => (scrollView.current ? scrollView.current.scrollTo({ y: -contentInset.top, animated: true }) : null), [contentInset.top])
  const refreshControl = useMemo(() => {
    if (onRefresh) return <RefreshControl onRefresh={onRefresh} refreshing={refreshing ? true : false} />
    else return <RefreshControl />
  }, [onRefresh, refreshing])
  const content = (
    <View style={containerStyle}>
      <KeyboardAwareScrollView
        {...props}
        contentInset={contentInset}
        contentOffset={contentOffset}
        bottomOffset={footerLock ? footerHeight + 2 : 2}
        extraKeyboardSpace={8}
        onContentSizeChange={handleContentSizeChange}
        onScroll={handleScroll}
        ref={(el) => {
          if (props.ref) props.ref.current = el
          scrollView.current = el
        }}
        refreshControl={refreshControl}
      >
        {children}
      </KeyboardAwareScrollView>
      <Animated.View style={[styles.fab, { top: fabTop }, fabStyle]}>
        <FAB icon='chevron-up' onPress={handleScrollToTop} />
      </Animated.View>
    </View>
  )
  return gesture ? <GestureDetector gesture={gesture}>{content}</GestureDetector> : content
}
const styles = StyleSheet.create({
  fab: { position: 'absolute', right: 4, zIndex: 3 }
})

export const ScrollView = memo(ScrollViewInner) as typeof ScrollViewInner
