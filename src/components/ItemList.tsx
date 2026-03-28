import { memo, useCallback, useContext, useMemo, useState } from 'react'
import { GestureResponderEvent, ListRenderItem, StyleSheet, View } from 'react-native'
import { Gesture } from 'react-native-gesture-handler'
import { scheduleOnRN } from 'react-native-worklets'

import { useList, useOptions, useSettings } from '../hooks'
import { Filter } from '../models'
import { Generic } from '../types'
import { FlatList, FlatListProps } from './FlatList'
import { GalleryItem } from './GalleryItem'
import { GridItem } from './GridItem'
import { ItemListEmpty } from './ItemListEmpty'
import { ItemMenu } from './ItemMenu'
import { ListFooter } from './ListFooter'
import { ListItem } from './ListItem'
import { Menu } from './Menu'
import { ScrollViewContext } from './ScrollViewProvider'

export type ItemListProps<T> = {
  collection: string
  icon: string
  isSelected?: (item: T) => boolean
  items?: T[]
  onEdit?: (item: T) => void
  onLongPress?: (item: T, event?: GestureResponderEvent) => void
  onPress?: (item: T, event?: GestureResponderEvent) => void
  onRefresh?: () => void
  params?: Filter
  waitOn?: boolean
} & Omit<FlatListProps<T>, 'data' | 'renderItem'>

type ItemListOptions = {
  columns: number
  mode: 'gallery' | 'grid' | 'list'
}

const MIN_COLUMNS = 1
const MAX_COLUMNS = 5

const ItemListInner = <T extends Generic>({ collection, icon, isSelected, items = [], onEdit, onPress, onLongPress, onRefresh, params, waitOn, ...props }: ItemListProps<T>) => {
  const { setProgressing } = useContext(ScrollViewContext)
  const { filter, setFilter, hash, search, setSearch, sort, setSort } = useList(collection, params)
  const { columns, mode, setOptions } = useOptions<ItemListOptions>(collection, { columns: 3, mode: 'list' })
  const { headerLock, footerLock } = useSettings()
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })
  const [menu, setMenu] = useState(false)
  const [menuItem, setMenuItem] = useState<T>()
  const [refreshing, setRefreshing] = useState(false)

  const sortKeys = ['createdAt', 'title', 'updatedAt']

  const handleLongPressInternal = useCallback(
    (item: T, e?: GestureResponderEvent) => {
      if (onLongPress) {
        onLongPress(item, e)
        return
      }
      if (!e) return
      const { nativeEvent: { pageX: x, pageY: y } } = e
      setAnchor({ x, y })
      setMenuItem(item)
      setMenu(true)
    },
    [onLongPress]
  )
  const handleEdit = useCallback(() => onEdit && menuItem && onEdit(menuItem), [onEdit, menuItem])
  const handleMenu = useCallback(() => setMenu((m) => !m), [])
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    if (onRefresh) onRefresh()
    setRefreshing(false)
  }, [onRefresh])
  const handleColumns = useCallback(
    (delta: number) => {
      switch (mode) {
        case 'list':
          if (delta > 0) return setOptions({ mode: 'gallery' })
          else return setOptions({ mode: 'grid', columns: MAX_COLUMNS })
        case 'grid': {
          const nextColumns = columns + delta
          if (delta > 0) {
            if (nextColumns > MAX_COLUMNS) return setOptions({ mode: 'list' })
            else return setOptions({ columns: nextColumns })
          } else {
            if (nextColumns < MIN_COLUMNS) return setOptions({ mode: 'gallery' })
            else return setOptions({ columns: nextColumns })
          }
        }
        case 'gallery':
          if (delta > 0) return setOptions({ mode: 'grid', columns: MIN_COLUMNS })
          else return setOptions({ mode: 'list' })
        default:
          return
      }
    },
    [columns, mode, setOptions]
  )
  const listEmptyComponent = useMemo(() => <ItemListEmpty collection={collection} icon={icon} visible={true} />, [collection, icon])
  const pinchGesture = useMemo(
    () =>
      Gesture.Pinch().onEnd(({ scale }) => {
        'worklet'
        const gestureScale = typeof scale === 'number' ? scale : 1
        if (!isFinite(gestureScale)) return
        if (Math.abs(gestureScale - 1) < 0.08) return
        const delta = gestureScale > 1 ? -1 : 1
        scheduleOnRN(handleColumns, delta)
      }),
    [handleColumns]
  )
  const renderItem: ListRenderItem<T> = useCallback(
    ({ item }) => {
      const selected = isSelected ? isSelected(item) : false
      if (mode === 'gallery') return <GalleryItem icon={icon} item={item} onLongPress={handleLongPressInternal} onPress={onPress} selected={selected} variant={undefined} />
      else if (mode === 'grid') return <GridItem icon={icon} item={item} onLongPress={handleLongPressInternal} onPress={onPress} selected={selected} columns={columns} variant={undefined} />
      else return <ListItem icon={icon} item={item} onLongPress={handleLongPressInternal} onPress={onPress} selected={selected} variant={undefined} />
    },
    [mode, icon, isSelected, handleLongPressInternal, onPress, columns]
  )
  const numColumns = useMemo(() => (mode === 'grid' ? columns : 1), [columns, mode])
  return (
    <View style={StyleSheet.absoluteFill}>
      <Menu anchor={anchor} key={menu.toString()} onDismiss={handleMenu} visible={menu}>
        {menuItem && <ItemMenu<T> collection={collection} item={menuItem} onDismiss={handleMenu} onEdit={onEdit ? handleEdit : undefined} />}
      </Menu>
      <FlatList {...props} horizontal={mode === 'gallery'} gesture={pinchGesture} keyboardShouldPersistTaps='handled' data={items} initialNumToRender={items.length} headerLock={headerLock} footerLock={footerLock} key={`${mode}${columns}`} numColumns={numColumns} onRefresh={handleRefresh} refreshing={refreshing} renderItem={renderItem} variant={undefined} ListEmptyComponent={listEmptyComponent} />
      <ListFooter filter={filter} onFilterChange={setFilter} onSearchChange={setSearch} onSortChange={setSort} search={search} sort={sort} sortKeys={sortKeys} variant={undefined} />
    </View>
  )
}

export const ItemList = memo(ItemListInner) as typeof ItemListInner
