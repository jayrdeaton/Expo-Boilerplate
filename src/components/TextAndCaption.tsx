import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

export type TextAndCaptionProps = {
  caption?: string | null
  captionStyle?: TextStyle | TextStyle[]
  captionVariant?: 'displayLarge' | 'displayMedium' | 'displaySmall' | 'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' | 'titleSmall' | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall'
  numberOfCaption?: number
  numberOfText?: number
  style?: ViewStyle
  text?: string | null
  textStyle?: TextStyle | TextStyle[]
  textVariant?: 'displayLarge' | 'displayMedium' | 'displaySmall' | 'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' | 'titleSmall' | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall'
}

export const TextAndCaption = ({ caption, captionStyle, captionVariant = 'bodySmall', numberOfCaption = 1, numberOfText = 1, style, text, textStyle, textVariant = 'bodyMedium' }: TextAndCaptionProps) => {
  return (
    <View style={style}>
      {text && (
        <Text variant={textVariant} numberOfLines={numberOfText} style={[styles.title, textStyle]}>
          {text}
        </Text>
      )}
      {caption && (
        <Text variant={captionVariant} numberOfLines={numberOfCaption} style={[styles.caption, captionStyle]}>
          {caption}
        </Text>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  caption: {
    marginVertical: -2
  },
  title: {
    fontWeight: 'bold'
  }
})
