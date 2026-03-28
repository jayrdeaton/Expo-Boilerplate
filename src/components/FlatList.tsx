import { memo, type RefObject, useCallback, useContext, useMemo, useRef } from 'react'
import { FlatList as ReactFlatList, FlatListProps as ReactFlatListProps, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector, GestureType } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scheduleOnRN } from 'react-native-worklets'

import { config, layout } from '../constants'
import { useThrottle } from '../hooks'
import { ThemeVariant } from '../types'
import { FAB } from './FAB'
import { RefreshControl } from './RefreshControl'
import { ScrollViewProps } from './ScrollView'
import { ScrollViewContext } from './ScrollViewProvider'

const fabWidth = 100

export type FlatListProps<T> = ReactFlatListProps<T> & {
  footerLock?: boolean
  gesture?: GestureType
  headerLock?: boolean
  ref?: RefObject<ReactFlatList>
  variant?: ThemeVariant
}

const FlatListInner = <T extends { id: string }>({ footerLock, gesture, headerLock, horizontal, numColumns, onRefresh, refreshing, style, variant, onContentSizeChange, onEndReached, ref: externalRef, ...props }: FlatListProps<T>) => {
  const throttle = useThrottle()
  const insets = useSafeAreaInsets()
  const fabHidden = useSharedValue(1)
  const scrollHeight = useRef(0)
  const scrollView = useRef<ReactFlatList>(null)
  const { footerHeight, headerHeight, scrollPosition } = useContext(ScrollViewContext)
  const containerStyle = useMemo(() => [StyleSheet.absoluteFill, style], [style])
  const contentInset = useMemo(() => ({ bottom: footerLock ? footerHeight || insets.bottom : insets.bottom, top: headerHeight }), [footerLock, footerHeight, insets.bottom, headerHeight])
  const contentOffset = useMemo(() => ({ x: 0, y: -contentInset.top }), [contentInset.top])
  const contentContainerStyle = useMemo(() => ({ minHeight: layout.window.height - contentInset.top - contentInset.bottom }), [contentInset.bottom, contentInset.top])
  const fabTop = useMemo(() => (headerLock ? headerHeight : insets.top) + 4, [headerLock, headerHeight, insets.top])
  const fabStyle = useAnimatedStyle(() => {
    const opacity = fabHidden.value ? withTiming(0) : withTiming(1)
    const translateX = fabHidden.value ? withTiming(fabWidth) : withTiming(0)
    return { opacity, transform: [{ translateX }] }
  }, [])
  const handleContentSizeChange = useCallback(
    (w: number, h: number) => {
      scrollHeight.current = h
      if (onContentSizeChange) onContentSizeChange(w, h)
    },
    [onContentSizeChange]
  )
  const handleEndReached = useCallback(
    (info: { distanceFromEnd: number }) => {
      if (!onEndReached) return
      throttle(() => onEndReached(info), 1000)
    },
    [onEndReached, throttle]
  )
  const handleScroll = useAnimatedScrollHandler(({ contentOffset: { x, y }, contentSize: { height, width } }) => {
    scrollPosition.value = y
    fabHidden.value = y < 100 ? 1 : 0
    const distanceFromEnd = horizontal ? width - layout.window.width - x : height - layout.window.height - y
    if (distanceFromEnd <= config.listEndThreshold) scheduleOnRN(handleEndReached, { distanceFromEnd })
  })
  const handleScrollToTop = useCallback(() => (scrollView.current ? scrollView.current.scrollToOffset({ offset: -contentInset.top, animated: true }) : null), [contentInset.top])
  const keyExtractor = useCallback((item: T, i: number) => item?.id || i.toString(), [])
  const refreshControl = useMemo(() => {
    if (onRefresh) return <RefreshControl onRefresh={onRefresh} refreshing={refreshing ? true : false} />
    else return <RefreshControl />
  }, [onRefresh, refreshing])
  const renderScrollComponent = useCallback((_props: ScrollViewProps) => <KeyboardAwareScrollView {..._props} onScroll={handleScroll} />, [handleScroll])
  const detectorGesture = useMemo(() => {
    try {
      return gesture ? Gesture.Simultaneous(gesture, Gesture.Native()) : undefined
    } catch {
      return gesture
    }
  }, [gesture])
  const content = (
    <View style={containerStyle}>
      <ReactFlatList
        {...props}
        contentContainerStyle={contentContainerStyle}
        contentInset={contentInset}
        contentOffset={contentOffset}
        decelerationRate={horizontal ? 0 : undefined}
        horizontal={horizontal}
        // initialNumToRender={30}
        maxToRenderPerBatch={50}
        windowSize={100}
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        updateCellsBatchingPeriod={50}
        keyExtractor={keyExtractor}
        numColumns={horizontal ? undefined : numColumns}
        onContentSizeChange={handleContentSizeChange}
        ref={(el) => {
          if (externalRef) externalRef.current = el
          scrollView.current = el
        }}
        refreshControl={refreshControl}
        renderScrollComponent={renderScrollComponent}
        showsHorizontalScrollIndicator={horizontal}
        showsVerticalScrollIndicator={!horizontal}
        snapToInterval={horizontal ? layout.window.width : undefined}
      />
      <Animated.View style={[styles.fab, { top: fabTop }, fabStyle]}>
        <FAB icon='chevron-up' onPress={handleScrollToTop} variant={variant} />
      </Animated.View>
    </View>
  )
  return detectorGesture ? <GestureDetector gesture={detectorGesture}>{content}</GestureDetector> : content
}

const styles = StyleSheet.create({
  fab: { position: 'absolute', right: 4 }
})

export const FlatList = memo(FlatListInner) as typeof FlatListInner
