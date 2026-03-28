import { ViewStyle } from 'react-native'
import { ActivityIndicator as PaperActivityIndicator, ActivityIndicatorProps as PaperActivityIndicatorProps } from 'react-native-paper'

import { useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { getVariantColors } from '../utils'

export type ActivityIndicatorProps = {
  color?: string
  style?: ViewStyle
  testID?: string
  variant?: ThemeVariant
} & PaperActivityIndicatorProps

export const ActivityIndicator = ({ color, variant, ...props }: ActivityIndicatorProps) => {
  const { theme } = useTheme()
  const colors = getVariantColors(theme, variant)
  return <PaperActivityIndicator {...props} color={color || colors.accent} testID={props.testID} />
}
