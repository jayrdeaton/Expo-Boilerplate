import { Alert } from 'react-native'

export const confirm = (title: string, subtitle: string) => {
  return new Promise((resolve) => {
    Alert.alert(title, subtitle, [
      { text: 'Cancel', onPress: () => resolve(false), style: 'cancel' },
      { text: 'Ok', onPress: () => resolve(true) }
    ])
  })
}

export default confirm
