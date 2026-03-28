import { memo, useCallback } from 'react'
import { useTheme } from 'react-native-paper'

import { icons } from '../constants'
import { useSettings } from '../hooks'
import { IconButton, IconButtonProps } from './IconButton'

export type SearchbarButtonProps = Omit<IconButtonProps, 'icon'>

const SearchbarButtonInner = (props: SearchbarButtonProps) => {
  const { search, setSearch } = useSettings()
  const { colors } = useTheme()
  const handlePress = useCallback(() => setSearch(!search), [setSearch, search])
  return <IconButton {...props} icon={`${icons.search}${search ? '' : '-outline'}`} iconColor={search ? colors.primary : undefined} onPress={handlePress} />
}

export const SearchbarButton = memo(SearchbarButtonInner) as typeof SearchbarButtonInner
