import { useEffect } from 'react'
import { Linking } from 'react-native'

export const useLinking = () => {
  useEffect(() => {
    const subscription = Linking.addEventListener('url', () => {})
    return subscription.remove
  }, [])
}
