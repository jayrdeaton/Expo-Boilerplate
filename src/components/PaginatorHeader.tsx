import { memo, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, LayoutChangeEvent, ListRenderItem, StyleSheet, View, ViewStyle } from 'react-native'

import { layout } from '../constants'
import { Generic } from '../types'
import { capitalizedString, commaString, singularString, snack } from '../utils'
import { ActivityIndicator } from './ActivityIndicator'
import { Divider } from './Divider'
import { ImageOrIcon } from './ImageOrIcon'
import { ItemFormModal } from './ItemFormModal'
import { ItemMenu } from './ItemMenu'
import { ListItem } from './ListItem'
import { MenuButton } from './MenuButton'
import { NavigationButton } from './NavigationButton'
import { Row } from './Row'
import { ScrollViewHeader } from './ScrollViewHeader'
import { SettingsMenu } from './SettingsMenu'

  caption?: string
  collection: string
  children?: ReactNode
  disabled?: boolean
  icon: string
  id?: string
  LeftComponent?: ReactNode
  MenuItems?: ReactNode
  onChange: (item: T) => void
  onLayout?: (event: LayoutChangeEvent) => void
  onPress?: () => void
  RightComponent?: ReactNode
  style?: ViewStyle
  title?: string
}

const PaginatorHeaderInner = <T extends Generic>({ children, collection, disabled, icon, id, LeftComponent, MenuItems, onChange, onLayout, onPress, params, RightComponent, style, title }: PaginatorHeaderProps<T>) => {
  const [editing, setEditing] = useState(false)
  const flatListRef = useRef<FlatList<T>>(null)
  const master: T[] = []
  const count = 0
  const fetchMore = () => {}
  const hasMore = false
  const fetching = false
  const heightRef = useRef(0)
  const widthRef = useRef(layout.window.width)
  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (onLayout) onLayout(e)
      const {
        nativeEvent: {
          layout: { height, width }
        }
      } = e
      heightRef.current = height
      widthRef.current = width
    },
    [onLayout]
  )

  const currentIndex = useMemo(() => {
    if (!id) return 0
    const found = master.findIndex((i) => i.id === id)
    return found >= 0 ? found : 0
  }, [id, master])
  const currentItem = useMemo(() => {
    const result = master[currentIndex]
    return result || null
  }, [currentIndex, master])

  const [index, setIndex] = useState(currentIndex)

  useEffect(() => {
    setIndex(currentIndex)
  }, [currentIndex])

  const handleEditing = useCallback(() => setEditing((e) => !e), [])
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
  const variant = undefined
  const computedTitle = title || capitalizedString(singularString(collection))
  const loading = fetching || !master.length
  const renderItem: ListRenderItem<T> = useCallback(
    ({ item: pageItem }) => {
      const _variant = undefined
      const itemIcon = icon
      const caption = !disabled ? `${computedTitle} ${commaString(master.findIndex((m) => m.id === pageItem.id) + 1)} of ${commaString(count || master.length)}` : undefined
      return <ListItem icon={itemIcon} item={pageItem} caption={caption} onPress={onPress} style={{ width: widthRef.current }} variant={_variant} />
    },
    [variant, icon, disabled, computedTitle, master, count, onPress]
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
    <ScrollViewHeader>
      <View style={[style, styles.wrapper]}>
        <Row style={styles.row}>
          <View style={styles.center}>{LeftComponent || <NavigationButton />}</View>
          <View onLayout={handleLayout} style={[styles.header, styles.flex]}>
            {loading ? (
              <View style={[styles.loadingPage, styles.flex]}>
                <ImageOrIcon icon={icon} style={styles.image} variant={variant} />
                <ActivityIndicator style={styles.activity} variant={variant} />
              </View>
            ) : (
              <FlatList scrollEnabled={!disabled} ref={flatListRef} data={master} keyExtractor={(i) => i.id} horizontal initialScrollIndex={index} getItemLayout={(_data, idx) => ({ length: widthRef.current, offset: widthRef.current * idx, index: idx })} pagingEnabled showsHorizontalScrollIndicator={false} renderItem={renderItem} onViewableItemsChanged={handleViewableItemsChanged} viewabilityConfig={viewabilityConfig} onEndReachedThreshold={0.2} onEndReached={handleEndReached} onScrollToIndexFailed={handleScrollToIndexFailed} />
            )}
          </View>
          <View style={styles.center}>
            {RightComponent || (
              <MenuButton>
                <SettingsMenu />
                {MenuItems && <Divider />}
                {MenuItems}
                <Divider />
                <ItemMenu collection={currentItem?.collection || collection} item={master[index]} onEdit={handleEditing} />
              </MenuButton>
            )}
          </View>
        </Row>
        <ItemFormModal collection={collection} isNew={false} item={currentItem} visible={editing && !!currentItem} onDismiss={handleEditing} />
        {children}
      </View>
    </ScrollViewHeader>
  )
}

const styles = StyleSheet.create({
  activity: { alignItems: 'flex-start', flex: 1, paddingLeft: 8 },
  center: { alignItems: 'center' },
  flex: { flex: 1 },
  header: { height: layout.headerHeight },
  image: { marginRight: 4 },
  loadingPage: { alignItems: 'center', flexDirection: 'row' },
  row: { alignItems: 'center' },
  wrapper: { width: layout.window.width, zIndex: 1 }
})

export const PaginatorHeader = memo(PaginatorHeaderInner) as typeof PaginatorHeaderInner
