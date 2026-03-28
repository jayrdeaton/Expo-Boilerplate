/**
 * FilterPicker
 *
 * Icon button that opens a menu for filter options, including clear and custom children.
 *
 * Example:
 *   <FilterPicker keys={['active', 'archived']} value={filter} onChange={setFilter}>
 *     <MenuItem title="Status" onPress={handleStatus} />
 *   </FilterPicker>
 */
import { memo, type ReactNode, useCallback, useMemo, useState } from 'react'
import { Platform, StyleSheet, ViewStyle } from 'react-native'
import { Divider, useTheme } from 'react-native-paper'

import { icons } from '../constants'
import { Filter } from '../models'
import { ThemeVariant } from '../types'
import { Chip } from './Chip'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'

/**
 * Props for {@link FilterPicker}.
 *
 * @property children - Optional custom filter menu items.
 * @property keys - List of filter keys that can be set.
 * @property onChange - Called with updated filter object.
 * @property style - Optional style for the container view.
 * @property value - Current filter object.
 */
export type FilterPickerProps = {
  children?: ReactNode
  keys: string[]
  onChange: (value: Filter) => void
  style?: ViewStyle
  value: Filter
  variant?: ThemeVariant
}

const FilterPickerInner = ({ children, onChange, style, value, variant }: FilterPickerProps) => {
  const { colors } = useTheme()
  const [menu, setMenu] = useState(false)
  const filters = useMemo(() => Object.keys(value || {}), [value])
  const handleClear = useCallback(() => onChange({}), [onChange])
  const handleMenu = useCallback(() => setMenu((m) => !m), [])
  const handleDismiss = useCallback(() => setMenu(false), [])
  return (
    <Menu
      elevation={2}
      visible={menu}
      onDismiss={handleDismiss}
      anchor={
        <Chip icon={icons.filter} closeIcon={icons.close} onClose={handleDismiss} mode='outlined' onPress={handleMenu} style={[Platform.OS !== 'ios' && styles.button, style]} variant={variant}>
          Filter
        </Chip>
      }
    >
      <MenuItem icon={icons.search} onDismiss={handleDismiss} title='Search' variant={variant} />
      <Divider />
      {children}
      {children && <Divider />}
      <MenuItem iconColor={!filters.length && colors.surfaceDisabled} icon={icons.delete} onPress={handleClear} onDismiss={handleDismiss} title='Clear' />
    </Menu>
  )
}
const styles = StyleSheet.create({
  button: {
    height: 33
  }
})

export const FilterPicker = memo(FilterPickerInner) as typeof FilterPickerInner
