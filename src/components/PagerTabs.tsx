import { memo, useCallback, useContext, useMemo } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Animated, { interpolateColor, SharedValue, useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated'

import { layout } from '../constants'
import { useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'
import { Icon } from './Icon'
import { PagerContext } from './PagerProvider'
import { Row } from './Row'
import { TextAndCaption } from './TextAndCaption'
import { Touchable } from './Touchable'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

const ModuleAnimatedTabIcon = ({ name, color, style, index, position, disabledColor }: { name: string; color: string; style?: StyleProp<ViewStyle>; index: number; position: SharedValue<number>; disabledColor: string }) => {
  const animatedProps = useAnimatedProps(() => {
    'worklet'
    const d = Math.min(Math.abs(position.value - index), 1)
    const progress = 1 - d
    return { color: interpolateColor(progress, [0, 1], [disabledColor, color]) }
  })

  // @ts-ignore animatedProps is a valid prop for animated components
  return <AnimatedIcon name={name} animatedProps={animatedProps} style={style} />
}

export type PagerTab = {
  caption?: string
  icon: string
  title?: string
  loading?: boolean
  variant?: ThemeVariant
}

export type PagerTabsProps = {
  tabs: PagerTab[]
}

const PagerTabsInner = ({ tabs }: PagerTabsProps) => {
  const { pagerPosition: position, pagerRef: pager } = useContext(PagerContext)
  const { theme } = useTheme()
  const inputRange = useMemo(() => tabs.map((_, i) => i), [tabs])
  const outputRange = useMemo(
    () =>
      tabs.map((t) => {
        const { accent } = getVariantColors(theme, t.variant)
        return accent
      }),
    [tabs, theme]
  )
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value * (layout.window.width / tabs.length) }],
    backgroundColor: interpolateColor(position.value, inputRange, outputRange)
  }))
  const disabledColor = theme.colors.onBackground
  const handlePressPage = useCallback((index: number) => () => pager.current?.setPage(index), [pager])
  const renderTab = useCallback(
    (tab: PagerTab, index: number) => {
      const { accent } = getVariantColors(theme, tab.variant)
      return (
        <Touchable key={index} onPress={handlePressPage(index)} style={styles.tab} variant={tab.variant}>
          <Row style={styles.row}>
            <ModuleAnimatedTabIcon name={tab.icon} color={accent} style={styles.icon} index={index} position={position} disabledColor={disabledColor} />
            {tab.title || tab.caption ? <TextAndCaption text={tab.title} caption={tab.caption} /> : null}
          </Row>
        </Touchable>
      )
    },
    [handlePressPage, theme, position, disabledColor]
  )
  return (
    <View style={styles.tabs}>
      {tabs.map(renderTab)}
      <Animated.View style={[styles.indicator, indicatorStyle, { width: layout.window.width / tabs.length }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: { marginRight: 4 },
  indicator: { bottom: 0, height: 3, left: 0, position: 'absolute' },
  row: { alignItems: 'center', justifyContent: 'center' },
  tab: { flex: 1, justifyContent: 'center' },
  tabs: { flexDirection: 'row', height: 50, width: '100%' }
})

export const PagerTabs = memo(PagerTabsInner) as typeof PagerTabsInner
