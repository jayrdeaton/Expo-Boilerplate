import { Alert } from 'react-native'

export const alert = (title: string, message: string) =>
  new Promise((resolve) => {
    Alert.alert(title, message, [{ text: 'Ok', onPress: resolve }])
  })

export default alert
