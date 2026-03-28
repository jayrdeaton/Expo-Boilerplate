import { reloadAsync } from 'expo-updates'
import { useState } from 'react'

import { alert, checkForUpdate, getUpdateConfirmation, snack } from '../utils'

export const useUpdate = () => {
  const [checking, setChecking] = useState(false)

  const manualCheck = async () => {
    try {
      if (__DEV__) return alert('Updates unavailable', 'Update checks are disabled in development mode.')
      if (checking) return
      setChecking(true)
      const update = await checkForUpdate()
      if (!update) return alert('No update', 'You are on the most recent version.')
      const confirmation = await getUpdateConfirmation(update)
      if (!confirmation) return
      await reloadAsync()
    } catch (err) {
      snack.error(err.message)
    } finally {
      setChecking(false)
    }
  }

  return {
    checking,
    manualCheck
  }
}
