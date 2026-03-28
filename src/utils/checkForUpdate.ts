import { ExpoUpdatesManifest } from 'expo/config'
import { checkForUpdateAsync, fetchUpdateAsync } from 'expo-updates'

import { snack } from './snack'

export type UpdateManifest = ExpoUpdatesManifest & {
  extra?: { message?: string }
}

export const checkForUpdate = async (): Promise<UpdateManifest | null> => {
  try {
    if (__DEV__) return
    const { isAvailable } = await checkForUpdateAsync()
    if (!isAvailable) return null
    const { manifest } = await fetchUpdateAsync()
    if (manifest) return manifest as UpdateManifest
  } catch (err) {
    snack.error(err.message)
  }
}

export default checkForUpdate
