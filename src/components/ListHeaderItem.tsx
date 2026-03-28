import { memo, useCallback, useState } from 'react'
import { GestureResponderEvent, View } from 'react-native'

import { Filter } from '../models'
import { Generic } from '../types'
import { FlatListProps } from './FlatList'
import { ItemFormModal } from './ItemFormModal'
import { ItemMenu } from './ItemMenu'
import { ListItem, ListItemProps } from './ListItem'
import { Menu } from './Menu'

export type ListHeaderItemProps<T> = ListItemProps<T> & {
  collection: string
  onEdit?: (item: T) => void
  params?: Filter
  waitOn?: boolean
} & Omit<FlatListProps<T>, 'data' | 'renderItem'>

const ListHeaderItemInner = <T extends Generic>({ collection, item, onLongPress, ...props }: ListHeaderItemProps<T>) => {
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })
  const [editing, setEditing] = useState(false)
  const [menu, setMenu] = useState(false)
  const [menuItem, setMenuItem] = useState<T>()
  const handleLongPressInternal = useCallback(
    (item: T, e?: GestureResponderEvent) => {
      if (onLongPress) {
        onLongPress(item, e)
        return
      }
      if (!e) return
      const {
        nativeEvent: { pageX: x, pageY: y }
      } = e
      setAnchor({ x, y })
      setMenuItem(item)
      setMenu(true)
    },
    [onLongPress]
  )
  const handleEdit = useCallback(() => setEditing((e) => !e), [])
  const handleMenu = useCallback(() => setMenu((m) => !m), [])
  return (
    <View>
      <ListItem selected {...props} item={item} onLongPress={handleLongPressInternal} />
      <Menu anchor={anchor} key={menu.toString()} onDismiss={handleMenu} visible={menu}>
        {menuItem && <ItemMenu<T> collection={collection} item={menuItem} onDismiss={handleMenu} onEdit={handleEdit} />}
      </Menu>
      <ItemFormModal collection={collection} isNew={false} item={item} visible={editing} onDismiss={handleEdit} />
    </View>
  )
}

export const ListHeaderItem = memo(ListHeaderItemInner) as typeof ListHeaderItemInner
