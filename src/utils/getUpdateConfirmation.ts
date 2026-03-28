import { ExpoUpdatesManifest } from 'expo/config'

import { select } from './select'

export const getUpdateConfirmation = async (manifest: ExpoUpdatesManifest): Promise<boolean> => {
  const date = new Date(manifest.createdAt)
  const info = `A new update was released on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}.\n\nRestart app to update.`
  const selection = await select('Update available', info, [{ text: 'Restart' }, { text: 'Cancel', style: 'cancel' }])
  return selection === 0
}
