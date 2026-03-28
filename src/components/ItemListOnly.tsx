import { memo, useContext, useEffect, useMemo } from 'react'

import { FlatList, type FlatListProps } from './FlatList'
import { ItemListEmpty } from './ItemListEmpty'
import { ScrollViewContext } from './ScrollViewProvider'

export type ItemListOnlyProps<T> = {
  collection: string
  icon: string
  loading?: boolean
} & Omit<FlatListProps<T>, 'ListEmptyComponent'>

const ItemListOnlyInner = <T extends { id: string }>({ collection, icon, loading = false, refreshing, ...props }: ItemListOnlyProps<T>) => {
  const { setProgressing } = useContext(ScrollViewContext)

  useEffect(() => {
    setProgressing(loading)
  }, [loading, setProgressing])

  const listEmptyComponent = useMemo(() => {
    return <ItemListEmpty collection={collection} icon={icon} visible={!loading || !!refreshing} />
  }, [collection, icon, loading, refreshing])

  return <FlatList<T> {...props} ListEmptyComponent={listEmptyComponent} />
}

export const ItemListOnly = memo(ItemListOnlyInner) as typeof ItemListOnlyInner
