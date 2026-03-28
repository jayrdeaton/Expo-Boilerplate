import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useContext, useEffect, useState } from 'react'
import { NativeSyntheticEvent, StyleSheet, View } from 'react-native'
import PagerView, { PagerViewProps } from 'react-native-pager-view'
import { withTiming } from 'react-native-reanimated'

import { PagerContext } from './PagerProvider'
import { ScrollViewContext } from './ScrollViewProvider'

type LazyPagerProps = PagerViewProps & {}

export const LazyPager = ({ children, style, ...props }: LazyPagerProps) => {
  const { initialPage, pagerPosition, pagerRef, setPage } = useContext(PagerContext)
  const { scrollPosition } = useContext(ScrollViewContext)
  const navigation = useNavigation<StackNavigationProp<never>>()
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionEnd', () => setReady(true))
    return unsubscribe
  }, [navigation])

  // useEffect(() => {
  //   if (typeof initialPage === 'number' && pagerPosition) pagerPosition.value = initialPage
  // }, [])
  const handlePageSelected = (e: { nativeEvent: { position: number } }) => {
    const index = e.nativeEvent.position
    setPage(index)
  }
  const handlePagerScroll = ({
    nativeEvent: { position, offset }
  }: NativeSyntheticEvent<
    Readonly<{
      position: number
      offset: number
    }>
  >) => {
    if (scrollPosition.value > 0) scrollPosition.value = withTiming(0)
    pagerPosition.value = position + offset
  }
  const handleRef = (ref: PagerView | null) => {
    if (pagerRef) pagerRef.current = ref
  }
  return (
    <PagerView {...props} initialPage={initialPage} onPageScroll={handlePagerScroll} onPageSelected={handlePageSelected} ref={handleRef} style={[StyleSheet.absoluteFill, style]}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <View key={index} style={styles.page}>
              {index === initialPage || ready ? child : null}
            </View>
          ))
        : children}
    </PagerView>
  )
}

const styles = StyleSheet.create({
  page: { flex: 1 }
})
