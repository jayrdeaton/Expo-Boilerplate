import { MD3Theme } from 'react-native-paper'

import { ThemeVariant } from '../types'
import { getColorWithAlpha } from './getColorWithAlpha'

export type VariantColors = { accent: string; onAccent: string; container: string; onContainer: string; ripple: string }

export const getVariantColors = (theme: MD3Theme, variant?: ThemeVariant): VariantColors => {
  const accent = variant === 'secondary' ? theme.colors.secondary : variant === 'tertiary' ? theme.colors.tertiary : theme.colors.primary
  const onAccent = variant === 'secondary' ? theme.colors.onSecondary : variant === 'tertiary' ? theme.colors.onTertiary : theme.colors.onPrimary
  const container = variant === 'secondary' ? theme.colors.secondaryContainer : variant === 'tertiary' ? theme.colors.tertiaryContainer : theme.colors.primaryContainer
  const onContainer = variant === 'secondary' ? theme.colors.onSecondaryContainer : variant === 'tertiary' ? theme.colors.onTertiaryContainer : theme.colors.onPrimaryContainer
  const ripple = getColorWithAlpha(accent, 0.12)
  return { accent, onAccent, container, onContainer, ripple }
}
