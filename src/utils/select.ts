import { Alert, AlertButton } from 'react-native'

export type Selection = {
  text: string
  style?: 'default' | 'cancel' | 'destructive'
}

export const select = (title: string, message: string, selections: Selection[]): Promise<number> =>
  new Promise((resolve) => {
    const buttons = selections.reduce((a: AlertButton[], i: Selection, n: number) => [...a, { text: i.text, style: i.style, onPress: () => resolve(n) }], [])
    Alert.alert(title, message, [...buttons])
  })

export default select
