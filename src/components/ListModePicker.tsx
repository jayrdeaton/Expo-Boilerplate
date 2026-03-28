/**
 * ListModePicker
 *
 * Icon button that cycles list display modes (gallery/grid/list) and opens a menu
 * for setting grid column count.
 *
 * Example:
 *   <ListModePicker collection="products" />
 */
import { memo, useCallback, useState } from 'react'
import { GestureResponderEvent, StyleSheet, View, ViewStyle } from 'react-native'
import { Divider } from 'react-native-paper'

import { icons } from '../constants'
import { useOptions } from '../hooks'
import { IconButton } from './IconButton'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'

/**
 * Props for {@link ListModePicker}.
 *
 * @property collection - Collection name for managing list mode state.
 * @property style - Optional container style.
 */
export type ListModePickerProps = {
  collection: string
  modes?: ('gallery' | 'grid' | 'list')[]
  style?: ViewStyle
}

type ListOptions = {
  columns: number
  mode: 'gallery' | 'grid' | 'list'
}

// square -> grid -> apps ->
const ListModePickerInner = ({ collection, modes = ['list', 'grid', 'gallery'], style }: ListModePickerProps) => {
  const { columns, mode, setOptions } = useOptions<ListOptions>(collection, { columns: 3, mode: modes?.[0] || 'list' })
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })
  const [menu, setMenu] = useState(false)
  const [subAnchor, setSubAnchor] = useState({ x: 0, y: 0 })
  const [subMenu, setSubMenu] = useState(false)
  const handleColumns = useCallback(({ nativeEvent: { pageX: x, pageY: y } }: GestureResponderEvent) => {
    setSubAnchor({ x, y })
    setSubMenu((s) => !s)
  }, [])
  const handleLongPress = useCallback(({ nativeEvent: { pageX: x, pageY: y } }: GestureResponderEvent) => {
    setAnchor({ x, y })
    setMenu((m) => !m)
  }, [])
  const handlePress = useCallback(() => {
    const nextIndex = modes.indexOf(mode) + 1
    const nextMode = modes[nextIndex % modes.length]
    setOptions({ mode: nextMode })
  }, [modes, mode, setOptions])
  const handleItem = useCallback(
    (_mode: 'gallery' | 'grid' | 'list', _columns?: number) => {
      setOptions({ mode: _mode })
      if (_columns) setOptions({ columns: _columns })
    },
    [setOptions]
  )
  return (
    <View style={[styles.container, style]}>
      <IconButton icon={icons[mode]} onLongPress={handleLongPress} onPress={handlePress} />
      <Menu visible={menu} onDismiss={() => setMenu(false)} anchor={anchor}>
        {modes.includes('gallery') && <MenuItem icon={icons.gallery} selected={mode === 'gallery'} title='Gallery' onPress={() => handleItem('gallery')} />}
        <Divider />
        {modes.includes('grid') && <MenuItem icon={icons.grid} selected={mode === 'grid'} title='Grid' caption={`${columns} ${columns === 1 ? 'Column' : 'Columns'}`} onPress={handleColumns} />}
        {/* <MenuItem icon={icons.columns} selected={mode === 'grid'} title={`${columns} ${columns === 1 ? 'Column' : 'Columns'}`} onPress={handleColumns} /> */}
        <Divider />
        {modes.includes('list') && <MenuItem icon={icons.list} selected={mode === 'list'} title='List' onPress={() => handleItem('list')} />}
      </Menu>
      <Menu visible={subMenu} onDismiss={() => setSubMenu(false)} anchor={subAnchor}>
        <MenuItem icon={icons.grid} selected={columns === 1} title='1 Column' onPress={() => handleItem('grid', 1)} />
        <MenuItem icon={icons.grid} selected={columns === 2} title='2 Columns' onPress={() => handleItem('grid', 2)} />
        <MenuItem icon={icons.grid} selected={columns === 3} title='3 Columns' onPress={() => handleItem('grid', 3)} />
        <MenuItem icon={icons.grid} selected={columns === 4} title='4 Columns' onPress={() => handleItem('grid', 4)} />
        <MenuItem icon={icons.grid} selected={columns === 5} title='5 Columns' onPress={() => handleItem('grid', 5)} />
      </Menu>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  }
})

export const ListModePicker = memo(ListModePickerInner) as typeof ListModePickerInner
