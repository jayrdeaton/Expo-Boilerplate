/**
 * SortPicker
 *
 * Chip + menu to pick a sort key and toggle ascending/descending order.
 *
 * Example:
 *   <SortPicker values={['title', 'created']} value={sort} onChange={setSort} />
 */
import { memo, useCallback, useMemo, useState } from 'react'
import { Platform, StyleSheet, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { icons } from '../constants'
import { Sort } from '../models'
import { ThemeVariant } from '../types'
import { keyString } from '../utils'
import { Chip } from './Chip'
import { IconButton } from './IconButton'
import { Menu } from './Menu'
import { Touchable } from './Touchable'

/**
 * Props for {@link SortPicker}.
 *
 * @property onChange - Called with updated Sort model on key or direction change.
 * @property value - Current Sort model.
 * @property values - List of keys user can sort by.
 * @property style - Optional chip style.
 */
export type SortPickerProps = {
  onChange: (value: Sort) => void
  style?: ViewStyle
  value?: Sort
  values: string[]
  variant?: ThemeVariant
}

const SortPickerInner = ({ onChange, style, value, values, variant }: SortPickerProps) => {
  const [menu, setMenu] = useState(false)
  const handleChange = useCallback(
    async (key: string) => {
      let newValue: Sort
      if (value && value[key]) {
        newValue = new Sort({ [key]: value[key] === 1 ? -1 : 1 })
      } else {
        newValue = new Sort({ [key]: 1 })
      }
      onChange?.(newValue)
    },
    [onChange, value]
  )
  const handleMenu = useCallback(() => {
    if (values.length === 1) {
      void handleChange(values[0])
      return
    }
    setMenu((m) => !m)
  }, [values, handleChange])
  const handleSwap = useCallback(() => {
    const k = value && Object.keys(value)[0]
    if (k) void handleChange(k)
  }, [value, handleChange])
  const name = value && Object.keys(value)[0]
  const icon = value && name && value[name] === 1 ? 'arrow-up' : 'arrow-down'
  const items = useMemo(
    () =>
      values.map((key) => {
        return (
          <Touchable key={key} onPress={() => handleChange(key)} variant={variant}>
            <View style={styles.row}>
              <IconButton icon={key === name ? icon : ''} variant={variant} />
              <Text style={styles.name}>{keyString(key)}</Text>
            </View>
          </Touchable>
        )
      }),
    [values, handleChange, name, icon, variant]
  )
  return (
    <Menu
      visible={menu}
      onDismiss={handleMenu}
      anchor={
        <Chip icon={icons.sort} closeIcon={icon} onClose={handleSwap} mode='outlined' onPress={handleMenu} style={[Platform.OS !== 'ios' && styles.button, style]} variant={variant}>
          {keyString(name || '')}
        </Chip>
      }
    >
      {items}
    </Menu>
  )
}
const styles = StyleSheet.create({
  button: {
    height: 33
  },
  name: {
    marginRight: 8
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 4
  }
})

export const SortPicker = memo(SortPickerInner) as typeof SortPickerInner
