import React, { useEffect, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { useTheme } from '../hooks'
import { getVariantColors } from '../utils'
import { Icon } from './Icon'

export type ItemListEmptyProps = {
  collection: string
  icon: string
  visible?: boolean
}

export const ItemListEmpty = ({ collection, icon, visible = true }: ItemListEmptyProps) => {
  const { theme } = useTheme()
  const colors = useMemo(() => getVariantColors(theme, undefined), [theme])
  const opacity = useSharedValue(visible ? 1 : 0)
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))
  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 250 })
  }, [visible, opacity])
  return (
    <Animated.View style={[styles.empty, animatedStyle]}>
      <Icon name={`${icon}-outline`} size={64} color={colors.accent} />
      <Text variant='headlineSmall' style={styles.text}>
        No {collection} found
      </Text>
      {/* <Text variant='labelLarge'>Pull to refresh</Text> */}
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  empty: { alignItems: 'center', flex: 1, justifyContent: 'center', marginBottom: 60 },
  text: { marginVertical: 16, textAlign: 'center' }
})
