// import * as haptics from 'expo-haptics'
// import { GestureResponderEvent, TouchableOpacity as NativeTouchable, TouchableOpacityProps as NativeTouchableProps } from 'react-native'

import { TouchableRipple, TouchableRippleProps } from './TouchableRipple'

export type TouchableProps = {} & TouchableRippleProps

// export const Touchable = ({ onLongPress, onPress, ...props }: TouchableProps) => {
//   const handleLongPress = onLongPress
//     ? (event: GestureResponderEvent) => {
//         haptics.notificationAsync()
//         onLongPress(event)
//       }
//     : undefined
//   const handlePress = onPress
//     ? (event: GestureResponderEvent) => {
//         haptics.selectionAsync()
//         onPress(event)
//       }
//     : undefined
//   return <NativeTouchable {...props} disabled={!onPress && !onLongPress} onLongPress={handleLongPress} onPress={handlePress} />
// }

export const Touchable = TouchableRipple
