import { StyleSheet, View, ViewStyle } from 'react-native'
import { TextInput, TextInputProps } from 'react-native-paper'

import { IconButton } from './IconButton'

export type QuantityInputProps = {
  color: string
  onChangeText?: (text: string) => void
  style?: ViewStyle
  value: string
}

export const QuantityInput = (props: QuantityInputProps) => {
  const handleSign = () => {
    const { onChangeText, value } = props
    if (!onChangeText) return
    onChangeText(value.startsWith('-') ? value.substring(1) : `-${value}`)
  }
  return (
    <View style={[styles.container, props.style]}>
      <TextInput {...(props as TextInputProps)} />
      <IconButton icon={props.value.startsWith('-') ? 'add' : 'remove'} onPress={handleSign} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  }
})
