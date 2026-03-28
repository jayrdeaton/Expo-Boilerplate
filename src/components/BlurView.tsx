import { BlurView as ExpoBlurView, BlurViewProps as ExpoBlurViewProps } from 'expo-blur'
import { View } from 'react-native'

import { useSettings, useTheme } from '../hooks'

export type BlurViewProps = {} & ExpoBlurViewProps

export const BlurView = ({ children, style, ...props }: BlurViewProps) => {
  const { blur } = useSettings()
  const { theme } = useTheme()
  if (blur)
    return (
      <ExpoBlurView {...props} tint={theme.dark ? 'dark' : 'light'} style={style}>
        {children}
      </ExpoBlurView>
    )
  else return <View style={[{ backgroundColor: theme.colors.surface }, style]}>{children}</View>
}
