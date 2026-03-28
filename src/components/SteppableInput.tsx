/**
 * SteppableInput
 *
 * Numeric input with minus/plus buttons to step the value within `[min, max]` boundaries.
 * Emits the new value as a string via `onChangeText` (to match Paper TextInput API).
 *
 * Example:
 *   <SteppableInput min={0} max={10} value={qty} onChangeText={(t) => setQty(Number(t))} />
 */
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper'

import { IconButton } from './IconButton'

/**
 * Props for {@link SteppableInput}.
 *
 * @property max - Maximum allowed numeric value.
 * @property min - Minimum allowed numeric value.
 * @property onChangeText - Called with string value when stepped or edited.
 * @property value - Current numeric value.
 */
export type SteppableInputProps = {
  max: number
  min: number
  onChangeText: (text: string) => void
  value: number
}

/**
 * Numeric input with stepper buttons.
 *
 * @param props - {@link SteppableInputProps}
 */
export const SteppableInput = (props: SteppableInputProps) => {
  const { max, min, onChangeText, value } = props
  const handleAdd = () => onChangeText && onChangeText((value + 1).toString())
  const handleSubtract = () => onChangeText && onChangeText((value - 1).toString())
  return (
    <View style={styles.view}>
      <IconButton disabled={value === min} icon='remove' onPress={handleSubtract} style={styles.button} />
      <TextInput {...props} value={value.toString()} />
      <IconButton disabled={value === max} icon='add' onPress={handleAdd} style={styles.button} />
    </View>
  )
}
const styles = StyleSheet.create({
  button: { marginHorizontal: 6 },
  view: { alignItems: 'center', flex: 1, flexDirection: 'row' }
})
