import { ReactNode, useEffect, useMemo, useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { IconButton } from '../components'

export type PricePickerProps = {
  digits?: number // number of digits to show (most-significant on the left)
  value?: number // initial numeric value (integer >= 0)
  onChange?: (value: number) => void
  style?: StyleProp<ViewStyle>
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export const PricePicker = ({ digits = 5, value = 0, onChange, style }: PricePickerProps) => {
  const initialDigits = Math.max(1, Math.floor(digits))
  const MAX_DIGITS = 9
  const [currentDigits, setCurrentDigits] = useState<number>(() => Math.min(initialDigits, MAX_DIGITS))

  const maxValue = useMemo(() => Math.pow(10, currentDigits) - 1, [currentDigits])

  const [internal, setInternal] = useState<number>(() => clamp(Math.floor(value || 0), 0, maxValue))

  // keep in sync when parent changes `value` or `digits` prop
  useEffect(() => {
    const v = clamp(Math.floor(value || 0), 0, maxValue)
    setInternal(v)
  }, [value, maxValue])

  // sync digits prop -> internal state
  useEffect(() => {
    const newInitial = Math.min(Math.max(1, Math.floor(digits)), MAX_DIGITS)
    setCurrentDigits((prev) => (prev === newInitial ? prev : newInitial))
  }, [digits])

  // when the number of digits changes, ensure the numeric value is clamped to the new max
  useEffect(() => {
    const newMax = Math.pow(10, currentDigits) - 1
    setInternal((prev) => {
      const next = clamp(prev, 0, newMax)
      if (next !== prev) onChange?.(next)
      return next
    })
  }, [currentDigits, onChange])

  const digitsArray = useMemo(() => {
    const pad = internal.toString().padStart(currentDigits, '0')
    return pad.split('').map((ch) => Number(ch))
  }, [internal, currentDigits])

  // changeTo removed in favor of functional updates (used by auto-repeat and press handlers)

  // Long-press auto-repeat removed — per-digit buttons will only respond to single taps.

  // Prepare increment/decrement callbacks for each possible digit position (fixed length)
  // We must keep the number of hooks stable across renders. Building fixed-length
  // arrays of callbacks (up to MAX_DIGITS) ensures `useAutoRepeat` is called the
  // same number of times every render. Entries beyond `currentDigits` are no-ops.
  const incCbs = useMemo(() => {
    return Array.from({ length: MAX_DIGITS }, (_, i) => {
      if (i >= currentDigits) return () => {}
      return () =>
        setInternal((prev) => {
          const place = Math.pow(10, currentDigits - 1 - i)
          const next = clamp(prev + place, 0, maxValue)
          onChange?.(next)
          return next
        })
    })
  }, [currentDigits, maxValue, onChange])

  const decCbs = useMemo(() => {
    return Array.from({ length: MAX_DIGITS }, (_, i) => {
      if (i >= currentDigits) return () => {}
      return () =>
        setInternal((prev) => {
          const place = Math.pow(10, currentDigits - 1 - i)
          const next = clamp(prev - place, 0, maxValue)
          onChange?.(next)
          return next
        })
    })
  }, [currentDigits, maxValue, onChange])

  // No auto-repeat hooks: single-tap only

  // Show a decimal point before the last two digits (pennies)
  const fracDigits = currentDigits >= 2 ? 2 : 0
  const integerDigits = currentDigits - fracDigits

  const nodes: ReactNode[] = []
  // if there are no integer digits, put the separator first
  if (integerDigits <= 0 && fracDigits > 0) {
    nodes.push(
      <View key={`sep-start`} style={styles.decimalSep}>
        <Text style={styles.decimalText}>.</Text>
      </View>
    )
  }

  for (let i = 0; i < digitsArray.length; i++) {
    const d = digitsArray[i]
    nodes.push(
      <View key={`col-${i}`} style={styles.col}>
        <IconButton accessibilityLabel={`increment-digit-${i}`} icon='chevron-up' onPress={incCbs[i]} style={styles.arrowBtn} />
        <View style={styles.digitBox}>
          <Text style={styles.digitText}>{d}</Text>
        </View>
        <IconButton accessibilityLabel={`decrement-digit-${i}`} icon='chevron-down' onPress={decCbs[i]} style={styles.arrowBtn} />
      </View>
    )
    if (i === integerDigits - 4 && fracDigits > 0) {
      nodes.push(
        <View key={`sep-${i}`} style={styles.decimalSep}>
          <Text style={styles.decimalText}>,</Text>
        </View>
      )
    }
    if (i === integerDigits - 1 && fracDigits > 0) {
      nodes.push(
        <View key={`sep-${i}`} style={styles.decimalSep}>
          <Text style={styles.decimalText}>.</Text>
        </View>
      )
    }
  }

  return <View style={[styles.container, style]}>{nodes}</View>
}

const styles = StyleSheet.create({
  arrowBtn: {
    // paddingHorizontal: 8,
    // paddingVertical: 6
  },
  col: {
    alignItems: 'center'
    // marginHorizontal: 4
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  decimalSep: {
    alignItems: 'center',
    justifyContent: 'center'
    // marginHorizontal: 6
  },
  decimalText: {
    fontWeight: '600'
  },
  digitBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    minHeight: 36,
    minWidth: 28
  },
  digitText: {
    fontWeight: '600'
  }
})
