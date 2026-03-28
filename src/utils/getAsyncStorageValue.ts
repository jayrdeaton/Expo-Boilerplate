import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAsyncStorageValue = async <T>(key: string, default_value: T) => {
  const string = await AsyncStorage.getItem(key)
  if (!string) return default_value
  try {
    const value = JSON.parse(string)
    return value
  } catch {
    return string
  }
}

export default getAsyncStorageValue
