import { StyleSheet, View, ViewStyle } from 'react-native'

import { Filter, Sort } from '../models'
import { ThemeVariant } from '../types'
import { FilterPicker } from './FilterPicker'
import { Footer } from './Footer'
import { SearchFAB } from './SearchFAB'
import { SortPicker } from './SortPicker'

export type ListFooterProps = {
  filter?: Filter
  onFilterChange?: (filter: Filter) => void
  onSearchChange?: (search: string) => void
  onSortChange?: (sort: Sort) => void
  search?: string
  sort?: Sort
  sortKeys?: string[]
  style?: ViewStyle
  variant?: ThemeVariant
}

export const ListFooter = ({ filter, onFilterChange, onSearchChange, onSortChange, search, sort, sortKeys, style, variant }: ListFooterProps) => {
  return (
    <Footer style={style}>
      <View style={[styles.footerItem, styles.alignLeft]}>{sort && <SortPicker onChange={onSortChange} value={sort} values={sortKeys} variant={variant} />}</View>
      {onSearchChange && <SearchFAB value={search} onChangeText={onSearchChange} variant={variant} />}
      <View style={[styles.footerItem, styles.alignRight]}>{filter && <FilterPicker onChange={onFilterChange} value={filter} keys={[]} variant={variant} />}</View>
    </Footer>
  )
}

const styles = StyleSheet.create({
  alignLeft: { alignItems: 'flex-start' },
  alignRight: { alignItems: 'flex-end' },
  footerItem: { flex: 1, marginHorizontal: 8 }
})
