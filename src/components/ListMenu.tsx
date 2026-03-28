import { View } from 'react-native'

import { icons } from '../constants'
import { useSettings } from '../hooks'
import { MenuItem } from './MenuItem'

export type ListMenuProps = {
  collection?: string
  disabled?: string[]
  hidden?: string[]
  onAdd?: () => void
  onReset?: () => void
}

export const ListMenu = ({ collection, hidden = [], disabled = [], onAdd, onReset }: ListMenuProps) => {
  const { headerLock, setHeaderLock, footerLock, setFooterLock, paginate, setPaginate, search, setSearch } = useSettings()
  const handlePaginate = () => setPaginate(!paginate)
  const handleHeaderLock = () => setHeaderLock(!headerLock)
  const handleFooterLock = () => setFooterLock(!footerLock)
  const handleSearch = () => setSearch(!search)
  if (!onAdd) hidden?.push('Add')
  if (!onReset) hidden?.push('Reset')
  return (
    <View>
      {!hidden?.includes('Header') ? <MenuItem selected={headerLock} disabled={disabled?.includes('Header') || false} onPress={handleHeaderLock} title='Header' icon={`${icons.header}${!headerLock ? '-outline' : ''}`} /> : null}
      {!hidden?.includes('Paginate') ? <MenuItem selected={paginate} disabled={disabled?.includes('Paginate') || false} onPress={handlePaginate} title='Paginate' icon={`${icons.paginate}${!paginate ? '-outline' : ''}`} /> : null}
      {!hidden?.includes('Footer') ? <MenuItem selected={footerLock} disabled={disabled?.includes('Footer') || false} onPress={handleFooterLock} title='Footer' icon={`${icons.footer}${!footerLock ? '-outline' : ''}`} /> : null}
      {!hidden?.includes('Search') ? <MenuItem selected={search} disabled={disabled?.includes('Search') || false} onPress={handleSearch} title='Search' icon={`${icons.search}${!search ? '-outline' : ''}`} /> : null}
      {!hidden?.includes('Add') ? <MenuItem disabled={disabled?.includes('Grid') || false} onPress={onAdd} title={`Add ${collection}`} icon={icons.add} /> : null}
      {/* Reset Filters removed */}
    </View>
  )
}
