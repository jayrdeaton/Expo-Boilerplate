import React, { useEffect, useMemo, useState } from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { IconButton } from '../components'
import { icons } from '../constants'
import { colors } from '../constants/colors'

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
    if (newInitial !== currentDigits) setCurrentDigits(newInitial)
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

  // Auto-repeat hook for long-press behavior
  function useAutoRepeat(
    cb: () => void,
    opts?: {
      initialDelay?: number
      initialInterval?: number
      minInterval?: number
      accelStepMs?: number
      accelEvery?: number
    }
  ) {
    const { initialDelay = 350, initialInterval = 150, minInterval = 50, accelStepMs = 20, accelEvery = 400 } = opts || {}
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
    const accelRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
    const currentInterval = React.useRef(initialInterval)
    const cbRef = React.useRef(cb)

    // keep cbRef up to date
    React.useEffect(() => {
      cbRef.current = cb
    }, [cb])

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        if (intervalRef.current) clearInterval(intervalRef.current)
        if (accelRef.current) clearInterval(accelRef.current)
      }
    }, [])

    const start = React.useCallback(() => {
      // reset interval
      currentInterval.current = initialInterval
      // start after delay
      timeoutRef.current = setTimeout(() => {
        // first repeat tick
        cbRef.current()
        // start repeating
        intervalRef.current = setInterval(() => cbRef.current(), currentInterval.current)

        // acceleration loop: decrease interval gradually and restart interval
        accelRef.current = setInterval(() => {
          const next = Math.max(minInterval, currentInterval.current - accelStepMs)
          if (next !== currentInterval.current) {
            currentInterval.current = next
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = setInterval(() => cbRef.current(), currentInterval.current)
            }
          }
        }, accelEvery)
      }, initialDelay)
    }, [initialDelay, initialInterval, accelEvery, accelStepMs, minInterval])

    const stop = React.useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (accelRef.current) {
        clearInterval(accelRef.current)
        accelRef.current = null
      }
    }, [])

    return { start, stop }
  }

  // Helper to create a fixed number of useAutoRepeat hooks.
  // We explicitly call useAutoRepeat for each slot to keep ESLint happy
  // while still ensuring a stable hook call order.
  function useMultiAutoRepeat(cbs: (() => void)[]) {
    const noop = () => {}
    const r0 = useAutoRepeat(cbs[0] || noop)
    const r1 = useAutoRepeat(cbs[1] || noop)
    const r2 = useAutoRepeat(cbs[2] || noop)
    const r3 = useAutoRepeat(cbs[3] || noop)
    const r4 = useAutoRepeat(cbs[4] || noop)
    const r5 = useAutoRepeat(cbs[5] || noop)
    const r6 = useAutoRepeat(cbs[6] || noop)
    const r7 = useAutoRepeat(cbs[7] || noop)
    const r8 = useAutoRepeat(cbs[8] || noop)
    return [r0, r1, r2, r3, r4, r5, r6, r7, r8] as ReturnType<typeof useAutoRepeat>[]
  }

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

  // Create auto-repeat hooks for each possible digit position using a fixed count
  const incRepeats = useMultiAutoRepeat(incCbs)
  const decRepeats = useMultiAutoRepeat(decCbs)

  // Show a decimal point before the last two digits (pennies)
  const fracDigits = currentDigits >= 2 ? 2 : 0
  const integerDigits = currentDigits - fracDigits

  const nodes: React.ReactNode[] = []
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
        <IconButton accessibilityLabel={`increment-digit-${i}`} icon='chevron-up' onPress={incCbs[i]} onPressIn={incRepeats[i].start} onPressOut={incRepeats[i].stop} onBlur={incRepeats[i].stop} style={styles.arrowBtn} />
        <View style={styles.digitBox}>
          <Text style={styles.digitText}>{d}</Text>
        </View>
        <IconButton accessibilityLabel={`decrement-digit-${i}`} icon='chevron-down' onPress={decCbs[i]} onPressIn={decRepeats[i].start} onPressOut={decRepeats[i].stop} onBlur={decRepeats[i].stop} style={styles.arrowBtn} />
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

  const addDigit = () => setCurrentDigits((p) => Math.min(p + 1, MAX_DIGITS))
  const removeDigit = () => setCurrentDigits((p) => Math.max(1, p - 1))

  return (
    <View style={[styles.container, style]}>
      {/* <IconButton accessibilityLabel={'add-digit'} icon={'plus'} onPress={addDigit} style={styles.sideBtn} /> */}
      {nodes}
      {/* <IconButton accessibilityLabel={'remove-digit'} icon={'minus'} onPress={removeDigit} style={styles.sideBtn} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  arrowBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  col: {
    alignItems: 'center',
    marginHorizontal: 4
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  decimalSep: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6
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
  },
  sideBtn: {
    marginHorizontal: 6
  }
})
