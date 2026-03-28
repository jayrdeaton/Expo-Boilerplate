/**
 * QuantityPicker
 *
 * Chip + menu that lets users filter by sign of quantity relative to zero.
 * Cycles comparison operators for positive/zero/negative states and calls `onChange`
 * with an updated `value` object containing an optional `{ quantity: { comparison, value } }`.
 *
 * Example:
 *   <QuantityPicker value={filter} onChange={setFilter} />
 */
import { useState } from 'react'
import { Platform, StyleSheet, View, ViewStyle } from 'react-native'
import { Checkbox, Chip, Menu, Text, useTheme } from 'react-native-paper'

import { icons } from '../constants'
import { Icon } from './Icon'
import { Touchable } from './Touchable'

export type Quantity = {
  value: number
  comparison: string
}

/**
 * Props for {@link QuantityPicker}.
 *
 * @property onChange - Receives the mutated `value` object after user toggles a state.
 * @property value - Object containing optional `quantity` filter with `comparison` and `value`.
 * @property style - Optional container style for the Chip.
 */
export type QuantityPickerProps = {
  onChange: (value: { quantity?: Quantity }) => void
  value: { quantity?: Quantity }
  style?: ViewStyle
}

/**
 * Chip that opens a menu to select positive/zero/negative quantity filter.
 *
 * @param props - {@link QuantityPickerProps}
 */
export const QuantityPicker = ({ onChange, style, value }: QuantityPickerProps) => {
  const { colors } = useTheme()
  const [menu, setMenu] = useState(false)
  const handleMenu = () => setMenu(!menu)
  const label = () => {
    const { quantity } = value
    if (!quantity) return 'Any Qty'
    const comparison = quantity.comparison === '>' ? '>' : quantity.comparison === '>=' ? '≥' : quantity.comparison === '=' ? '=' : quantity.comparison === '<=' ? '≤' : quantity.comparison === '<' ? '<' : quantity.comparison === '!=' ? '≠' : ''
    return `Qty ${comparison} 0`
  }
  const positive = () => {
    const { quantity } = value
    return !quantity ? false : quantity.comparison === '>' || quantity.comparison === '>=' || quantity.comparison === '!='
  }
  const zero = () => {
    const { quantity } = value
    return !quantity ? false : quantity.comparison === '>=' || quantity.comparison === '=' || quantity.comparison === '<='
  }
  const negative = () => {
    const { quantity } = value
    return !quantity ? false : quantity.comparison === '<' || quantity.comparison === '<=' || quantity.comparison === '!='
  }
  const handlePositive = async () => {
    const { quantity } = value
    if (!quantity) {
      value.quantity = { comparison: '>', value: 0 }
    } else if (quantity.comparison === '>') {
      delete value.quantity
    } else if (quantity.comparison === '>=') {
      quantity.comparison = '='
    } else if (quantity.comparison === '=') {
      quantity.comparison = '>='
    } else if (quantity.comparison === '<=') {
      delete value.quantity
    } else if (quantity.comparison === '<') {
      quantity.comparison = '!='
    } else if (quantity.comparison === '!=') {
      quantity.comparison = '<'
    } else {
      //
    }
    if (onChange) onChange(value)
  }
  const handleZero = async () => {
    const { quantity } = value
    if (!quantity) {
      value.quantity = { comparison: '=', value: 0 }
    } else if (quantity.comparison === '>') {
      quantity.comparison = '>='
    } else if (quantity.comparison === '>=') {
      quantity.comparison = '>'
    } else if (quantity.comparison === '=') {
      delete value.quantity
    } else if (quantity.comparison === '<=') {
      quantity.comparison = '<'
    } else if (quantity.comparison === '<') {
      quantity.comparison = '<='
    } else if (quantity.comparison === '!=') {
      delete value.quantity
    } else {
      //
    }
    if (onChange) onChange(value)
  }
  const handleNegative = async () => {
    const { quantity } = value
    if (!quantity) {
      value.quantity = { comparison: '<', value: 0 }
    } else if (quantity.comparison === '>') {
      quantity.comparison = '!='
    } else if (quantity.comparison === '>=') {
      delete value.quantity
    } else if (quantity.comparison === '=') {
      quantity.comparison = '<='
    } else if (quantity.comparison === '<=') {
      quantity.comparison = '='
    } else if (quantity.comparison === '<') {
      delete value.quantity
    } else if (quantity.comparison === '!=') {
      quantity.comparison = '>'
    } else {
      //
    }
    if (onChange) onChange(value)
  }
  const color = value && value.quantity !== undefined ? colors.primary : 'red'
  const renderIcon = (_props: object) => <Icon {..._props} color={color} name={icons.unit} />
  return (
    <Menu
      visible={menu}
      onDismiss={handleMenu}
      anchor={
        <Chip icon={renderIcon} mode='outlined' onPress={handleMenu} style={[Platform.OS !== 'ios' && styles.button, style]}>
          {label()}
        </Chip>
      }
    >
      <Touchable onPress={handlePositive}>
        <View style={styles.row}>
          <Checkbox status={positive() ? 'checked' : 'unchecked'} />
          <Text style={styles.name}>Positive</Text>
        </View>
      </Touchable>
      <Touchable onPress={handleZero}>
        <View style={styles.row}>
          <Checkbox status={zero() ? 'checked' : 'unchecked'} />
          <Text style={styles.name}>Zero</Text>
        </View>
      </Touchable>
      <Touchable onPress={handleNegative}>
        <View style={styles.row}>
          <Checkbox status={negative() ? 'checked' : 'unchecked'} />
          <Text style={styles.name}>Negative</Text>
        </View>
      </Touchable>
    </Menu>
  )
}
const styles = StyleSheet.create({
  button: {
    height: 33
  },
  name: {
    marginHorizontal: 8
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 4
  }
})
