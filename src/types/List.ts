import { Filter } from '../models/Filter'
import { Sort } from '../models/Sort'

export type ListColumns = { [key: string]: number }
export type ListFilters = { [key: string]: Filter }
export type ListModes = { [key: string]: 'gallery' | 'grid' | 'list' }
export type ListSearches = { [key: string]: string }
export type ListSorts = { [key: string]: Sort }
