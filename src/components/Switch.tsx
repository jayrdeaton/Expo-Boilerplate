/**
 * Switch
 *
 * A small labeled boolean switch that stores internal state, syncs with `value` prop,
 * and reports changes via `onChange`.
 *
 * Example:
 *   <Switch label="Enabled" value={enabled} onChange={setEnabled} />
 */
import { useEffect, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Switch as RNSwitch, Text } from 'react-native-paper'

/**
 * Props for {@link Switch}.
 *
 * @property label - Optional label shown above the switch.
 * @property onChange - Called with the new boolean value when toggled.
 * @property style - Optional container style.
 * @property value - Current value; defaults to false.
 */
export type SwitchProps = {
  label?: string
  onChange: (value: boolean) => void
  style?: ViewStyle
  value?: boolean
}

/**
 * Labeled boolean switch with controlled/uncontrolled support.
 *
 * @param props - {@link SwitchProps}
 */
export const Switch = (props: SwitchProps) => {
  const { label, style } = props
  const [value, setValue] = useState(props.value || false)
  useEffect(() => setValue(props.value || false), [props.value])
  const handleChange = (_value: boolean) => {
    setValue(_value)
    if (props.onChange) props.onChange(_value)
  }
  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <Text variant='bodySmall' numberOfLines={1} style={styles.caption}>
          {label}
        </Text>
      ) : null}
      <RNSwitch value={value} onValueChange={handleChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  caption: {
    marginVertical: -2
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    marginVertical: 2
  }
})
