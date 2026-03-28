import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme, NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { Appearance, StatusBar, StyleSheet, View } from 'react-native'
import { MD3DarkTheme as PaperDarkTheme, MD3LightTheme as PaperLightTheme, Provider as PaperProvider } from 'react-native-paper'
import { shallowEqual, useSelector } from 'react-redux'

import { strings } from '../constants'
import { RootState } from '../store'
import { getBlendedColor, getTriadicPalette, isDarkColor } from '../utils'
import { Snackbar } from './Snackbar'

SplashScreen.preventAutoHideAsync()
SplashScreen.setOptions({
  duration: 500,
  fade: true
})

const selector = (state: RootState) => state.theme

const collectionDefaults = {
  catalogs: null,
  onCatalogs: null,
  catalogsContainer: null,
  onCatalogsContainer: null,
  containers: null,
  onContainers: null,
  containersContainer: null,
  onContainersContainer: null,
  products: null,
  onProducts: null,
  productsContainer: null,
  onProductsContainer: null,
  units: null,
  onUnits: null,
  unitsContainer: null,
  onUnitsContainer: null
}

const darkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...collectionDefaults
  },
  fonts: PaperDarkTheme.fonts
}

const lightTheme = {
  ...PaperLightTheme,
  ...NavigationLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    ...NavigationLightTheme.colors,
    ...collectionDefaults
  },
  fonts: PaperLightTheme.fonts
}

export type ThemeProps = {
  children: ReactNode
}

export const Theme = ({ children }: ThemeProps) => {
  const { appearance, color } = useSelector(selector, shallowEqual)
  const [theme, setTheme] = useState(null)
  const getTheme = useCallback(() => {
    let _appearance: string | null | undefined = appearance
    if (_appearance === strings.system) _appearance = Appearance.getColorScheme()
    if (_appearance === strings.no_preference) _appearance = strings.light
    const baseTheme = _appearance === strings.dark ? darkTheme : lightTheme
    const _theme = {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        elevation: {
          ...baseTheme.colors.elevation
        }
      }
    }

    const colors = getTriadicPalette(color)
    const surface = baseTheme.colors.surface
    // primary
    _theme.colors.primary = colors.primary
    _theme.colors.onPrimary = isDarkColor(colors.primary) ? '#ffffff' : '#000000'
    _theme.colors.primaryContainer = getBlendedColor(colors.primary, surface, 0.15)
    _theme.colors.onPrimaryContainer = isDarkColor(_theme.colors.primaryContainer) ? '#ffffff' : '#000000'
    // secondary
    _theme.colors.secondary = colors.secondary
    _theme.colors.onSecondary = isDarkColor(colors.secondary) ? '#ffffff' : '#000000'
    _theme.colors.secondaryContainer = getBlendedColor(colors.secondary, surface, 0.15)
    _theme.colors.onSecondaryContainer = isDarkColor(_theme.colors.secondaryContainer) ? '#ffffff' : '#000000'
    // tertiary
    _theme.colors.tertiary = colors.tertiary
    _theme.colors.onTertiary = isDarkColor(colors.tertiary) ? '#ffffff' : '#000000'
    _theme.colors.tertiaryContainer = getBlendedColor(colors.tertiary, surface, 0.15)
    _theme.colors.onTertiaryContainer = isDarkColor(_theme.colors.tertiaryContainer) ? '#ffffff' : '#000000'
    // collections
    _theme.colors.units = _theme.colors.primary
    _theme.colors.onUnits = _theme.colors.onPrimary
    _theme.colors.unitsContainer = _theme.colors.primaryContainer
    _theme.colors.onUnitsContainer = _theme.colors.onPrimaryContainer
    _theme.colors.products = _theme.colors.secondary
    _theme.colors.onProducts = _theme.colors.onSecondary
    _theme.colors.productsContainer = _theme.colors.secondaryContainer
    _theme.colors.onProductsContainer = _theme.colors.onSecondaryContainer
    _theme.colors.containers = _theme.colors.tertiary
    _theme.colors.onContainers = _theme.colors.onTertiary
    _theme.colors.containersContainer = _theme.colors.tertiaryContainer
    _theme.colors.onContainersContainer = _theme.colors.onTertiaryContainer
    _theme.colors.catalogs = _theme.colors.tertiary
    _theme.colors.onCatalogs = _theme.colors.onTertiary
    _theme.colors.catalogsContainer = _theme.colors.tertiaryContainer
    _theme.colors.onCatalogsContainer = _theme.colors.onTertiaryContainer

    const blended = getBlendedColor(color, colors.secondary, 0.5)
    const tintSurface = (alpha: number) => getBlendedColor(blended, surface, alpha)

    _theme.colors.surface = surface
    _theme.colors.surfaceVariant = tintSurface(0.2)
    _theme.colors.outline = getBlendedColor(color, baseTheme.colors.outline, 0.45)
    const grey = baseTheme.dark ? '#424242' : '#c2c2c2'
    const blendedGrey = getBlendedColor(blended, grey, 0.05)
    _theme.colors.elevation = {
      ..._theme.colors.elevation,
      level1: _theme.colors.surface,
      level2: getBlendedColor(blendedGrey, _theme.colors.surface, 0.25),
      level3: getBlendedColor(blendedGrey, _theme.colors.surface, 0.4),
      level4: getBlendedColor(blendedGrey, _theme.colors.surface, 0.55),
      level5: getBlendedColor(blendedGrey, _theme.colors.surface, 0.7)
    }
    setTheme(_theme)
  }, [appearance, color])
  useEffect(() => {
    getTheme()
  }, [appearance, color, getTheme])
  useEffect(() => {
    const subscription = Appearance.addChangeListener(getTheme)
    return subscription.remove
  }, [getTheme])
  useEffect(() => {
    if (theme) SplashScreen.hideAsync()
  }, [theme])
  if (!theme) return null
  const backgroundColor = theme.colors.background
  const baseNavTheme = theme.dark ? NavigationDarkTheme : NavigationLightTheme
  const navigationTheme = {
    ...baseNavTheme,
    colors: {
      ...baseNavTheme.colors,
      // Keep navigation background in sync with paper theme
      background: backgroundColor,
      card: backgroundColor
    }
  }
  return (
    <NavigationContainer theme={navigationTheme}>
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={backgroundColor} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
        <View style={[styles.flex, { backgroundColor }]}>{children}</View>
        <Snackbar />
      </PaperProvider>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  flex: { flex: 1 }
})
