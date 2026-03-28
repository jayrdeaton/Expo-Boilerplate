/**
 * TextInput
 *
 * A controlled/uncontrolled-friendly wrapper around react-native-paper's TextInput that
 * normalizes between empty strings and null. Emits `null` when cleared, but renders as
 * an empty string to the underlying Paper component.
 *
 * Example:
 *   <TextInput label="Name" value={name} onChangeText={setName} />
 */
import React, { forwardRef, useEffect, useState } from 'react'
import { StyleSheet, TextInput as RNTextInput } from 'react-native'
import { TextInput as PaperTextInput, TextInputProps as PaperTextInputProps } from 'react-native-paper'

/**
 * Props for {@link TextInput}.
 *
 * @property onChangeText - Called with `string | null`. Receives `null` when user clears the field.
 * @property value - Current value. May be `string` or `null`.
 */
export type TextInputProps = {
  onChangeText?: (value: string | null) => void
  value?: string | null
} & Omit<PaperTextInputProps, 'onChangeText' | 'value'>

/**
 * Text input that maps internal empty string representation to `null` for consumers when cleared.
 *
 * @param props - {@link TextInputProps}
 */

export const TextInput = forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  // const inputRef = useRef<RNTextInput | null>(null)
  const [value, setValue] = useState<string>(props.value ?? '')
  useEffect(() => setValue(props.value ?? ''), [props.value])
  const handleChange = (next: string) => {
    setValue(next)
    if (props.onChangeText) props.onChangeText(next || null)
  }

  return <PaperTextInput ref={ref} dense mode='outlined' {...props} value={value} onChangeText={handleChange} style={[styles.input, props.style]} />
})

TextInput.displayName = 'TextInput'

const styles = StyleSheet.create({
  input: { flex: 1, margin: 2 }
})
