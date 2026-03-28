import { type ComponentRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Portal, Searchbar, SearchbarProps } from 'react-native-paper'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'

import { icons } from '../constants'
import { useKeyboard } from '../hooks'
import { ThemeVariant } from '../types'
import { Chip } from './Chip'
import { FAB } from './FAB'

export type SearchFABProps = SearchbarProps & {
  disabled?: boolean
  debounce?: boolean
  onLongPress?: () => void
  size?: 'small' | 'medium' | 'large'
  style?: ViewStyle
  value?: string
  variant?: ThemeVariant
}

const SearchFABInner = ({ disabled, debounce, onChangeText, onLongPress, size = 'small', variant = 'primary', style: _style, value: propValue = '' }: SearchFABProps) => {
  const { height: keyboardHeight } = useKeyboard()
  const searchbarRef = useRef<ComponentRef<typeof Searchbar>>(null)
  const fabHeightRef = useRef(0)
  const [searching, setSearching] = useState(false)
  const [value, setValue] = useState(propValue)
  const valueRef = useRef('')

  const handleBlur = useCallback(() => setSearching(false), [])
  const handleChip = useCallback(
    (text: string) => {
      setValue(text)
      onChangeText?.(text)
    },
    [onChangeText]
  )
  const handleDismiss = useCallback(() => {
    searchbarRef.current?.blur()
    setSearching(false)
  }, [])
  const handleClear = useCallback(() => {
    setValue('')
    onChangeText?.('')
  }, [onChangeText])
  const handleRemoveHistory = useCallback((_text: string) => {}, [])
  const handleFocus = useCallback(() => {
    setSearching(true)
    searchbarRef.current?.setSelection(0, value.length)
  }, [value.length])
  const handleNavigation = useCallback(() => {}, [])
  const handleSearcher = useCallback(() => searchbarRef.current?.focus(), [])
  const handleSubmit = useCallback(() => {
    onChangeText?.(value)
  }, [onChangeText, value])
  useEffect(() => {
    if (!onChangeText) return
    if (value === valueRef.current) return
    if (debounce) {
      const timeout = setTimeout(() => onChangeText?.(value), 500)
      return () => clearTimeout(timeout)
    } else {
      onChangeText?.(value)
    }
  }, [debounce, onChangeText, value, searching])
  useEffect(() => {
    if (!searching) setValue(propValue)
  }, [propValue, searching])
  useEffect(() => {
    if (value) valueRef.current = value
  }, [value])
  const animated = useAnimatedStyle(() => {
    const opacity = searching ? withTiming(1) : withTiming(0)
    const translateY = -keyboardHeight.value
    return { opacity, transform: [{ translateY }] }
  }, [searching])
  const chipAnimated = useAnimatedStyle(() => {
    const opacity = !searching && value ? withTiming(1) : withTiming(0)
    const translateY = !searching && value ? withTiming(-56) : withTiming(0)
    return { opacity, transform: [{ translateY }] }
  }, [searching, value])
  const panGesture = useMemo(
    () =>
      Gesture.Pan().onEnd((event) => {
        if (event.translationY > 50) {
          scheduleOnRN(handleDismiss)
        }
      }),
    [handleDismiss]
  )
  const handleFabLayout = useCallback((event) => {
    fabHeightRef.current = event.nativeEvent.layout.height
  }, [])
  const renderHistoryItem = useCallback(
    ({ item }: { item: string }) => (
      <Chip mode='outlined' onPress={() => handleChip(item)} onLongPress={() => handleRemoveHistory(item)} style={styles.chip}>
        {item}
      </Chip>
    ),
    [handleChip, handleRemoveHistory]
  )
  return (
    <View>
      <View style={styles.container}>
        <Animated.View style={[chipAnimated, styles.chipContainer]}>
          <Chip mode='outlined' onPress={handleNavigation} onClose={handleClear}>
            {value}
          </Chip>
        </Animated.View>
        <FAB size={size} variant={variant} disabled={disabled === true} mode='elevated' icon={icons.search} onLongPress={onLongPress} onPress={handleSearcher} onLayout={handleFabLayout} style={styles.fab} />
        <Portal>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[animated, styles.animated]}>
              <Searchbar ref={searchbarRef} onFocus={handleFocus} onBlur={handleBlur} onClearIconPress={handleClear} onIconPress={handleNavigation} onSubmitEditing={handleSubmit} value={value} onChangeText={setValue} />
            </Animated.View>
          </GestureDetector>
        </Portal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  animated: { bottom: 0, left: 0, position: 'absolute', right: 0 },
  chip: { marginHorizontal: 2 },
  chipContainer: { alignItems: 'center', bottom: 0, flexDirection: 'row', justifyContent: 'center', left: -100, paddingVertical: 4, position: 'absolute', right: -100, textAlign: 'center' },
  container: { alignItems: 'center' },
  fab: {},
  historyContainer: { alignItems: 'center', flexDirection: 'row' },
  historyFlatList: { flex: 1 },
  historyList: { paddingVertical: 2 }
})

export const SearchFAB = memo(SearchFABInner) as typeof SearchFABInner
