import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, FlatList, GestureResponderEvent, ListRenderItem, StyleSheet, View, ViewStyle } from 'react-native'
import { Surface, useTheme } from 'react-native-paper'

import { useList, useSettings } from '../hooks'
import { Filter } from '../models'
import { Generic } from '../types'
import { capitalizedString, singularString, snack } from '../utils'
import { ActivityIndicator } from './ActivityIndicator'
import { Collapsible } from './Collapsible'
import { IconButton } from './IconButton'
import { ImageOrIcon } from './ImageOrIcon'
import { ItemMenu } from './ItemMenu'
import { ListItem } from './ListItem'
import { Menu } from './Menu'

export type PaginatorProps<T> = {
  collection: string
  icon: string
  id?: string
  onChange: (item: T) => void
  onLongPress?: () => void
  onPress?: () => void
  params?: Filter
  style?: ViewStyle
  title?: string
}

const PaginatorInner = <T extends Generic>({ collection, icon, id, onChange, onLongPress, onPress, params, style, title }: PaginatorProps<T>) => {
  const { hash } = useList(collection, params)
  const { paginate } = useSettings()
  const { colors } = useTheme()
  const primaryColor = colors.primary
  const screenWidth = Dimensions.get('window').width
  const flatListRef = useRef<FlatList<T>>(null)
  const [menu, setMenu] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 })
  const items: T[] = []
  const count = 0
  const fetchMore = () => {}
  const hasMore = false
  const fetching = false
  const master = items
  const indexFromId = useMemo(() => {
    if (!id) return 0
    const found = master.findIndex((i) => i.id === id)
    return found >= 0 ? found : 0
  }, [id, master])
  const [index, setIndex] = useState(indexFromId)

  useEffect(() => {
    setIndex(indexFromId)
  }, [indexFromId])

  const handleLongPress = useCallback((_: T, { nativeEvent: { pageX: x, pageY: y } }: GestureResponderEvent) => {
    setMenuAnchor({ x, y })
    setMenu(true)
  }, [])

  const handleNext = useCallback(() => {
    if (!master.length) return
    const next = index + 1
    if (next >= master.length) return
    flatListRef.current?.scrollToIndex({ index: next, animated: true })
  }, [master.length, index])
  const handlePrevious = useCallback(() => {
    if (!master.length) return
    const prev = index - 1
    if (prev < 0) return
    flatListRef.current?.scrollToIndex({ index: prev, animated: true })
  }, [master.length, index])

  const viewabilityConfig = { itemVisiblePercentThreshold: 80 }
  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: { item: T; index?: number }[] }) => {
      if (!viewableItems.length) return
      const v = viewableItems[0]
      if (typeof v.index !== 'number') return
      if (v.index === index) return
      setIndex(v.index)
      const current = master[v.index]
      if (current?.id) onChange(current)
      if (hasMore && v.index + 1 >= master.length) fetchMore()
    },
    [fetchMore, hasMore, index, master, onChange]
  )

  const computedTitle = title || capitalizedString(singularString(collection))
  const loading = fetching || !master.length

  const renderItem: ListRenderItem<T> = useCallback(
    ({ index: pageIndex, item: pageItem }) => {
      const itemIcon = icon
      const prevDisabled = fetching || pageIndex <= 0
      const nextDisabled = fetching || pageIndex === -1 || pageIndex + 1 >= master.length
      return (
        <View style={[styles.page, { width: screenWidth }]}>
          <ListItem icon={itemIcon} item={pageItem} caption={`${computedTitle} ${master.findIndex((m) => m.id === pageItem.id) + 1} of ${count || master.length}`} onPress={onPress} onLongPress={onLongPress || ((r: T, e) => handleLongPress(r, e))} style={styles.pageItem} />
          <IconButton disabled={prevDisabled} icon='arrow-back' iconColor={primaryColor} onPress={handlePrevious} />
          <IconButton disabled={nextDisabled} icon='arrow-forward' iconColor={primaryColor} onPress={handleNext} />
        </View>
      )
    },
    [icon, fetching, master, screenWidth, computedTitle, count, onPress, onLongPress, primaryColor, handlePrevious, handleNext, handleLongPress]
  )

  const handleEndReached = useCallback(() => {
    if (hasMore) fetchMore()
  }, [hasMore, fetchMore])

  const handleScrollToIndexFailed = useCallback(() => {
    try {
      flatListRef.current?.scrollToIndex({ index: 0, animated: true })
    } catch (err) {
      if (err instanceof Error) snack.error(err.message)
    }
  }, [])

  return (
    <Collapsible visible={paginate} style={style}>
      <Surface style={[styles.listContainer, { backgroundColor: colors.surface }]}>
        {loading ? (
          <View style={[styles.loadingPage, { width: screenWidth }]}>
            <ImageOrIcon icon={icon} style={styles.image} />
            <ActivityIndicator style={styles.activity} />
          </View>
        ) : (
          <FlatList ref={flatListRef} data={master} keyExtractor={(i) => i.id} horizontal initialScrollIndex={index} getItemLayout={(data, idx) => ({ length: screenWidth, offset: screenWidth * idx, index: idx })} pagingEnabled showsHorizontalScrollIndicator={false} renderItem={renderItem} onViewableItemsChanged={handleViewableItemsChanged} viewabilityConfig={viewabilityConfig} onEndReachedThreshold={0.2} onEndReached={handleEndReached} onScrollToIndexFailed={handleScrollToIndexFailed} />
        )}
        <Menu anchor={menuAnchor} onDismiss={() => setMenu(false)} visible={menu}>
          <ItemMenu collection={collection} item={master[index]} />
        </Menu>
      </Surface>
    </Collapsible>
  )
}

const styles = StyleSheet.create({
  activity: { alignItems: 'flex-start', flex: 1, paddingLeft: 8 },
  image: { marginRight: 4 },
  listContainer: { marginVertical: 2 },
  loadingPage: { alignItems: 'center', flexDirection: 'row' },
  page: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 8 },
  pageItem: { flex: 1 }
})

export const Paginator = memo(PaginatorInner) as typeof PaginatorInner
