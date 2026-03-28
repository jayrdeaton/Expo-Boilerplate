import { useCallback, useMemo, useState } from 'react'
import { GestureResponderEvent, View } from 'react-native'

import { icons } from '../constants'
import { useOptions } from '../hooks'
import { capitalizedString } from '../utils'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'
import { MenuItemSubmenu } from './MenuItemSubmenu'

export type ListModeMenuProps = {
  collection: string
  modes?: ('gallery' | 'grid' | 'list')[]
  title?: string
}

type ListOptions = {
  columns: number
  mode: 'gallery' | 'grid' | 'list'
}

export const ListModeMenu = ({ collection, modes = ['list', 'grid', 'gallery'], title }: ListModeMenuProps) => {
  const { columns, mode, setOptions } = useOptions<ListOptions>(collection, { columns: 3, mode: modes?.[0] || 'list' })
  const [subAnchor, setSubAnchor] = useState({ x: 0, y: 0 })
  const [subMenu, setSubMenu] = useState(false)
  const variant = undefined
  const modeCaption = useMemo(() => capitalizedString(mode), [mode])
  const gridCaption = useMemo(() => `${columns} ${columns === 1 ? 'Column' : 'Columns'}`, [columns])
  const modesSet = useMemo(() => new Set(modes), [modes])
  const handleColumns = useCallback(({ nativeEvent: { pageX: x, pageY: y } }: GestureResponderEvent) => {
    setSubAnchor({ x, y })
    setSubMenu((s) => !s)
  }, [])
  const handleItem = useCallback(
    (_mode: 'gallery' | 'grid' | 'list', _columns?: number) => {
      if (_mode === 'grid' && _columns) setOptions({ mode: _mode, columns: _columns })
      else setOptions({ mode: _mode })
    },
    [setOptions]
  )
  const handleGallery = useCallback(() => handleItem('gallery'), [handleItem])
  const handleList = useCallback(() => handleItem('list'), [handleItem])
  const gridHandlers = useMemo(() => [1, 2, 3, 4, 5].map((c) => () => handleItem('grid', c)), [handleItem])
  return (
    <View>
      <MenuItemSubmenu icon={icons[mode]} title={title || 'Mode'} caption={modeCaption} variant={variant}>
        {modesSet.has('gallery') && <MenuItem icon={icons.gallery} selected={mode === 'gallery'} title='Gallery' onPress={handleGallery} variant={variant} />}
        {modesSet.has('grid') && <MenuItem icon={icons.grid} selected={mode === 'grid'} title='Grid' caption={gridCaption} onPress={handleColumns} variant={variant} />}
        {modesSet.has('list') && <MenuItem icon={icons.list} selected={mode === 'list'} title='List' onPress={handleList} variant={variant} />}
      </MenuItemSubmenu>
      <Menu visible={subMenu} onDismiss={() => setSubMenu(false)} anchor={subAnchor}>
        <MenuItem icon={icons.grid} selected={columns === 1} title='1 Column' onPress={gridHandlers[0]} variant={variant} />
        <MenuItem icon={icons.grid} selected={columns === 2} title='2 Columns' onPress={gridHandlers[1]} variant={variant} />
        <MenuItem icon={icons.grid} selected={columns === 3} title='3 Columns' onPress={gridHandlers[2]} variant={variant} />
        <MenuItem icon={icons.grid} selected={columns === 4} title='4 Columns' onPress={gridHandlers[3]} variant={variant} />
        <MenuItem icon={icons.grid} selected={columns === 5} title='5 Columns' onPress={gridHandlers[4]} variant={variant} />
      </Menu>
    </View>
  )
}
