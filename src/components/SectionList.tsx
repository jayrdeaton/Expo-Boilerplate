import React, { memo, type ReactElement, type ReactNode, type RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, LayoutChangeEvent, SectionList as ReactSectionList, SectionListData, SectionListProps as ReactSectionListProps, SectionListRenderItem, StyleSheet, View, ViewStyle } from 'react-native'
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-controller'
import { Divider, ProgressBar } from 'react-native-paper'
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scheduleOnRN } from 'react-native-worklets'

import { layout } from '../constants'
import { useKeyboard, useSettings } from '../hooks'
import { BlurView } from './BlurView'
import { Collapsible } from './Collapsible'
import { FAB } from './FAB'
import { RefreshControl } from './RefreshControl'

const fabWidth = 100

export type SectionListProps<T> = Omit<ReactSectionListProps<T[], { title: string; key: string; data: T[][] }>, 'renderItem'> & {
  FooterComponent?: ReactNode
  footerLock?: boolean
  HeaderComponent?: ReactNode
  headerLock?: boolean
  ListHeaderComponent?: ReactNode
  mode: string
  numColumns?: number
  onRefresh?: () => void
  progressing?: boolean
  ref?: RefObject<ReactSectionList>
  refreshing?: boolean
  renderItem: ({ item, section }: { item: T; section: SectionListData<T[], { title: string; key: string; data: T[][]; visible: boolean }> }) => ReactElement
  style?: ViewStyle
}

const SectionListInner = <T extends { id: string }>({ FooterComponent, footerLock, HeaderComponent, horizontal, ListHeaderComponent, numColumns, onRefresh, progressing, refreshing, renderItem, style, ref: externalRef, ...rest }: SectionListProps<T>) => {
  const { height: keyboardHeight } = useKeyboard()
  const insets = useSafeAreaInsets()
  const { headerLock } = useSettings()
  const fabOffset = useSharedValue(fabWidth)
  const [footerHeight, setFooterHeight] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [headerHidden, setHeaderHidden] = useState(false)
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  const scrollHeight = useRef(0)
  const scrollPosition = useSharedValue(0)
  const scrollView = useRef<ReactSectionList | null>(null)
  useEffect(() => {
    if (headerHidden) fabOffset.value = withTiming(0)
    else fabOffset.value = withTiming(fabWidth)
  }, [headerHidden, fabOffset, insets.top])
  const handleContentSizeChange = useCallback(
    (w: number, h: number) => {
      scrollHeight.current = h
      if (rest.onContentSizeChange) rest.onContentSizeChange(w, h)
    },
    [rest]
  )
  const handleFooterLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }: LayoutChangeEvent) => {
    setFooterHeight(height)
  }
  const handleHeaderLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }: LayoutChangeEvent) => {
    setHeaderHeight(height)
  }
  useEffect(() => {
    if (!isLayoutReady && headerHeight > 0 && footerHeight > 0) scheduleOnRN(setIsLayoutReady, true)
  }, [headerHeight, footerHeight, isLayoutReady])
  const handleScroll = useAnimatedScrollHandler(({ contentOffset: { y } }) => {
    if (headerLock) return
    scrollPosition.value = y
    if (y < headerHeight) scheduleOnRN(setHeaderHidden, false)
    else scheduleOnRN(setHeaderHidden, true)
  })
  const handleScrollToTop = useCallback(() => (scrollView.current ? scrollView.current.scrollToLocation({ sectionIndex: 0, itemIndex: 0 }) : null), [])
  const fabStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: fabOffset.value }] }
  }, [])
  const footerStyle = useAnimatedStyle(() => {
    if (footerLock) {
      const translateY = keyboardHeight.value > insets.bottom ? insets.bottom - keyboardHeight.value : 0
      return { transform: [{ translateY }] }
    } else {
      let translateY = scrollPosition.value <= 0 ? 0 : scrollPosition.value < footerHeight + insets.bottom ? scrollPosition.value : footerHeight + insets.bottom
      translateY += keyboardHeight.value
      return { transform: [{ translateY }] }
    }
  }, [footerHeight, footerLock])
  const headerStyle = useAnimatedStyle(() => {
    const translateY = scrollPosition.value < 0 ? 0 : -scrollPosition.value
    return { transform: [{ translateY }] }
  }, [])
  const handleRender: SectionListRenderItem<T[], { title: string; key: string; data: T[][]; visible: boolean }> = useCallback(
    (data) => {
      return (
        <Collapsible visible={data.section.visible}>
          <FlatList data={data.item} horizontal={false} ItemSeparatorComponent={Divider} key={numColumns} numColumns={numColumns} renderItem={({ item }) => renderItem({ item, section: data.section })} contentContainerStyle={styles.fullHeight} columnWrapperStyle={horizontal && styles.fullHeight} />
        </Collapsible>
      )
    },
    [numColumns, horizontal, renderItem]
  )
  const renderScrollComponent = useCallback((props: KeyboardAwareScrollViewProps) => <KeyboardAwareScrollView {...props} onScroll={handleScroll} />, [handleScroll])
  return (
    <View style={[styles.root, style]}>
      {!headerLock && (
        <View style={[styles.header, styles.blur, { height: insets.top }]}>
          <BlurView style={[StyleSheet.absoluteFill, { paddingTop: insets.top }]}>
            <ProgressBar indeterminate visible={!!progressing && headerHidden} style={styles.progressTop} />
          </BlurView>
        </View>
      )}
      <Animated.View onLayout={handleHeaderLayout} style={[styles.header, headerStyle, { paddingTop: insets.top }]}>
        {isLayoutReady && <BlurView style={StyleSheet.absoluteFill} />}
        {HeaderComponent}
        <ProgressBar indeterminate visible={!!progressing} style={styles.progressTop} />
        <Divider />
      </Animated.View>
      <ReactSectionList<T[], { title: string; key: string; data: T[][] }>
        {...rest}
        contentContainerStyle={{ minHeight: layout.window.height, paddingTop: headerLock ? 0 : headerHeight - insets.top, paddingBottom: horizontal ? 2 : (footerLock ? footerHeight : insets.bottom) + 2 }} // eslint-disable-line react-native/no-inline-styles
        decelerationRate={horizontal ? 0 : undefined}
        initialNumToRender={12}
        ListHeaderComponent={ListHeaderComponent}
        onContentSizeChange={handleContentSizeChange}
        SectionSeparatorComponent={Divider}
        showsHorizontalScrollIndicator={horizontal}
        showsVerticalScrollIndicator={!horizontal}
        snapToInterval={horizontal ? layout.window.width : undefined}
        renderItem={handleRender}
        renderScrollComponent={renderScrollComponent}
        ref={(el) => {
          if (externalRef) externalRef.current = el
          scrollView.current = el
        }}
        refreshControl={onRefresh && !horizontal && <RefreshControl onRefresh={onRefresh} refreshing={refreshing ? true : false} progressViewOffset={headerHeight} />}
        style={{ marginTop: -headerHeight, paddingTop: headerLock ? headerHeight : insets.top }}
      />
      <Animated.View onLayout={handleFooterLayout} style={[horizontal ? styles.horizontalFooter : styles.verticalFooter, footerStyle]}>
        <Divider />
        <BlurView style={{ paddingBottom: insets.bottom }}>
          <ProgressBar indeterminate visible={!!progressing} style={styles.progressBottom} />
          {FooterComponent}
        </BlurView>
      </Animated.View>
      <Animated.View style={[styles.fab, { top: (insets.top || 0) + 8 }, fabStyle]}>
        <FAB icon='chevron-up' onPress={handleScrollToTop} />
      </Animated.View>
    </View>
  )
}
const styles = StyleSheet.create({
  blur: { position: 'absolute', width: '100%', zIndex: 2 },
  fab: { position: 'absolute', right: 4 },
  fullHeight: { height: '100%' },
  header: { zIndex: 1 },
  horizontalFooter: { width: '100%' },
  progressBottom: { marginTop: -4, zIndex: 1 },
  progressTop: { marginBottom: -4, zIndex: 1 },
  root: { flex: 1 },
  verticalFooter: { bottom: 0, position: 'absolute', width: '100%' }
})

export const SectionList = memo(SectionListInner) as typeof SectionListInner
