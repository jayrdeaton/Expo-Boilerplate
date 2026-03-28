import { useContext } from 'react'
import { RefreshControl as ReactRefreshControl, RefreshControlProps as ReactRefreshControlProps } from 'react-native'

import { useTheme } from '../hooks'
import { RefreshContext } from './RefreshProvider'

export type RefreshControlProps = ReactRefreshControlProps

export const RefreshControl = ({ colors, tintColor, titleColor, onRefresh, refreshing, ...props }: Partial<RefreshControlProps>) => {
  const context = useContext(RefreshContext)
  const {
    theme: {
      colors: { primary }
    }
  } = useTheme()
  const handleRefresh = () => {
    if (onRefresh) onRefresh()
    else context?.refresh()
  }
  const isRefreshing = refreshing || context?.refreshing || false
  const _colors = colors || [primary]
  const _tintColor = tintColor || primary
  const _titleColor = titleColor || primary
  return <ReactRefreshControl {...props} colors={_colors} tintColor={_tintColor} titleColor={_titleColor} onRefresh={handleRefresh} refreshing={isRefreshing} />
}
