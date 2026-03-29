/**
 * AmountInput
 *
 * Text input for currency amounts. Stores value as cents (integer) internally,
 * displays as decimal dollars (e.g., 12.34).
 *
 * Example:
 *   <AmountInput value={priceInCents} onChangeNumber={setPrice} label="Price" />
 */
import { forwardRef, useEffect, useState } from 'react'
import { StyleSheet, TextInput as RNTextInput } from 'react-native'
import { TextInput as PaperTextInput, TextInputProps as PaperTextInputProps } from 'react-native-paper'

/**
 * Props for {@link AmountInput}.
 *
 * @property onChangeNumber - Called with amount in cents (int).
 * @property value - Amount in cents (int).
 */

export type AmountInputProps = {
  // value in cents (integer). If undefined/null, input will start empty.
  value?: number | null
  // Called with value in cents (integer). If the input is empty, the callback
  // may be called with undefined to indicate cleared input.
  onChangeNumber?: (value?: number) => void
} & Omit<PaperTextInputProps, 'onChangeText' | 'value'>

export const AmountInput = forwardRef<RNTextInput, AmountInputProps>((props, ref) => {
  // input text shown to the user (in dollars, allow empty and partial values)
  // show a leading dollar sign for non-empty values
  const initialText = props.value === undefined || props.value === null ? '' : `$${(props.value / 100).toFixed(2)}`
  const [text, setText] = useState<string>(initialText)
  const [isFocused, setIsFocused] = useState(false)

  // Sync from props when not focused so we don't clobber user's typing
  useEffect(() => {
    if (!isFocused) {
      if (props.value === undefined || props.value === null) setText('')
      else setText(`$${(props.value / 100).toFixed(2)}`)
    }
  }, [props.value, isFocused])

  const handleChange = (_value: string) => {
    // normalize input by removing any dollar signs and trimming
    const raw = _value.replace(/\$/g, '').trim()
    if (raw === '') {
      // empty input (no dollar sign shown)
      setText('')
      props.onChangeNumber?.(undefined)
      return
    }

    // Show the dollar sign in the displayed text while preserving partial input
    setText(`$${raw}`)

    // Parse numeric value when possible and notify parent in cents
    const parsed = parseFloat(raw)
    if (!isNaN(parsed)) {
      const cents = Math.round(parsed * 100)
      props.onChangeNumber?.(cents)
    }
  }

  const handleEnd = () => {
    const trimmed = text.replace(/\$/g, '').trim()
    if (trimmed === '') return
    const parsed = parseFloat(trimmed)
    if (isNaN(parsed)) {
      // if not a number, clear it
      setText('')
      props.onChangeNumber?.(undefined)
      return
    }
    // format to two decimals and show leading dollar sign
    setText(`$${parsed.toFixed(2)}`)
  }

  return <PaperTextInput ref={ref} dense mode='outlined' keyboardType='decimal-pad' selectTextOnFocus {...props} value={text} onChangeText={handleChange} onEndEditing={handleEnd} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} style={[styles.input, props.style]} returnKeyType='next' />
})

AmountInput.displayName = 'AmountInput'

const styles = StyleSheet.create({
  input: { flex: 1, margin: 2 }
})
