/**
 * NumberInput
 *
 * Wrapper around Paper TextInput that works with numeric values and bridges to
 * `onChangeNumber(number)` while internally storing a string for the input.
 *
 * Example:
 *   <NumberInput value={qty} onChangeNumber={setQty} />
 */
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { StyleSheet, TextInput as RNTextInput } from 'react-native'
import { TextInput as PaperTextInput, TextInputProps as PaperTextInputProps } from 'react-native-paper'

/**
 * Props for {@link NumberInput}.
 *
 * @property integer - When true, `onChangeNumber` only emits integers.
 * @property onChangeNumber - Called with parsed numeric value when input contains a valid number.
 * @property value - Current numeric value.
 */

export type NumberInputProps = {
  integer?: boolean
  onChangeNumber?: (value: number) => void
  value?: number
} & Omit<PaperTextInputProps, 'onChangeText' | 'value'>

export const NumberInput = forwardRef<RNTextInput, NumberInputProps>((props, ref) => {
  const { onEndEditing, ...restProps } = props
  const [value, setValue] = useState(props.value?.toString() || '')
  const isInteger = props.integer === true

  const isValidIntegerText = (text: string): boolean => {
    const trimmed = text.trim()
    if (!trimmed) return false
    return /^-?\d+$/.test(trimmed)
  }

  const parseForCompare = useCallback(
    (text: string): number => {
      const trimmed = text.trim()
      if (!trimmed) return Number.NaN

      const normalized = trimmed.replace(',', '.')
      const numberValue = isInteger ? parseInt(normalized, 10) : Number(normalized)
      return Number.isFinite(numberValue) ? numberValue : Number.NaN
    },
    [isInteger]
  )

  const parseForEmit = (text: string): number | undefined => {
    const trimmed = text.trim()
    if (!trimmed) return undefined

    if (isInteger && !isValidIntegerText(trimmed)) return undefined

    const normalized = trimmed.replace(',', '.')
    const numberValue = isInteger ? parseInt(normalized, 10) : Number(normalized)
    return Number.isFinite(numberValue) ? numberValue : undefined
  }

  useEffect(() => {
    setValue((current) => {
      const nextValue = props.value
      if (nextValue === undefined || nextValue === null) return current

      const parsedCurrent = parseForCompare(current)
      if (Number.isFinite(parsedCurrent) && parsedCurrent === nextValue) {
        if (isInteger && !isValidIntegerText(current)) return nextValue.toString()
        return current
      }

      return nextValue.toString()
    })
  }, [isInteger, parseForCompare, props.value])

  const handleChange = (_value: string) => {
    setValue(_value)
    const parsed = parseForEmit(_value)
    if (parsed !== undefined) {
      props.onChangeNumber?.(parsed)
    }
  }

  const handleEndEditing: NonNullable<PaperTextInputProps['onEndEditing']> = (event) => {
    if (!value.trim()) {
      setValue('0')
      props.onChangeNumber?.(0)
    }
    onEndEditing?.(event)
  }

  return <PaperTextInput ref={ref} dense mode='outlined' keyboardType={isInteger ? 'number-pad' : 'decimal-pad'} {...restProps} value={value} onChangeText={handleChange} onEndEditing={handleEndEditing} style={[styles.input, props.style]} />
})

NumberInput.displayName = 'NumberInput'

const styles = StyleSheet.create({
  input: { flex: 1, margin: 2 }
})
