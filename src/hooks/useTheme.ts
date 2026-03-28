import { useCallback } from 'react'
import { MD3Theme, useTheme as usePaperTheme } from 'react-native-paper'
import { NavigationTheme } from 'react-native-paper/lib/typescript/types'
import { useDispatch, useSelector } from 'react-redux'

import { RootState, themeActions } from '../store'

type AppTheme = MD3Theme &
  NavigationTheme & {
    colors: MD3Theme['colors'] & {
      catalogs: string
      onCatalogs: string
      catalogsContainer: string
      onCatalogsContainer: string
      containers: string
      onContainers: string
      containersContainer: string
      onContainersContainer: string
      products: string
      onProducts: string
      productsContainer: string
      onProductsContainer: string
      units: string
      onUnits: string
      unitsContainer: string
      onUnitsContainer: string
    }
  }

const selector = (state: RootState) => state.theme

export const useTheme = () => {
  const { appearance, color } = useSelector(selector)
  const dispatch = useDispatch()
  const theme = usePaperTheme<AppTheme>()
  const setAppearance = useCallback((value: 'system' | 'light' | 'dark') => dispatch(themeActions.setAppearance(value)), [dispatch])
  const setColor = useCallback((value: string) => dispatch(themeActions.setColor(value)), [dispatch])
  return {
    theme,
    appearance,
    setAppearance,
    color,
    setColor
  }
}
