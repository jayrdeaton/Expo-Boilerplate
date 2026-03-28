import { useKeyboardHandler } from 'react-native-keyboard-controller'
import { useSharedValue } from 'react-native-reanimated'

export const useKeyboard = () => {
  const height = useSharedValue(0)
  useKeyboardHandler(
    {
      onMove: (event) => {
        'worklet'
        height.value = event.height
      }
    },
    []
  )
  return { height }
}
