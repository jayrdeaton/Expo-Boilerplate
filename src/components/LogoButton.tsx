import { DrawerActions, useNavigation } from '@react-navigation/native'
import { GestureResponderEvent, Keyboard, StyleSheet, ViewStyle } from 'react-native'

import { Logo } from './Logo'
import { Touchable } from './Touchable'

export type LogoButtonProps = {
  onPress?: (event: GestureResponderEvent) => void
  style?: ViewStyle
}

export const LogoButton = ({ onPress, style }: LogoButtonProps) => {
  const navigation = useNavigation()
  const handlePress = () => {
    Keyboard.dismiss()
    navigation.dispatch(DrawerActions.openDrawer())
  }
  return (
    <Touchable onPress={onPress || handlePress} borderless style={[styles.logo, styles.touchable, style]}>
      <Logo style={styles.logo} />
    </Touchable>
  )
}

const styles = StyleSheet.create({
  logo: { height: 50, width: 50 },
  touchable: { borderRadius: 25 }
})
