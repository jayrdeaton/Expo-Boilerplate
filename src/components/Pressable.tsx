import * as haptics from 'expo-haptics'
import { GestureResponderEvent, Pressable as RNPressable, PressableProps as RNPressableProps } from 'react-native'

export type PressableProps = {
  onPress?: () => void
  onLongPress?: () => void
} & RNPressableProps

export const Pressable = ({ onPress, onLongPress, ...props }: PressableProps) => {
  const handleLongPress = onLongPress
    ? () => {
        haptics.notificationAsync()
        onLongPress()
      }
    : undefined
  const handlePress = onPress
    ? (event: GestureResponderEvent) => {
        haptics.selectionAsync()
        onPress(event)
      }
    : undefined
  return <RNPressable {...props} onLongPress={handleLongPress} onPress={handlePress} />
}
