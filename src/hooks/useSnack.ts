import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState, snackActions } from '../store'

const { setSnack } = snackActions
const snackSelector = (state: RootState) => state.snack

export const useSnack = () => {
  const dispatch = useDispatch()
  const { snack } = useSelector(snackSelector)

  const clearSnack = useCallback(() => dispatch(setSnack()), [dispatch])
  const dispatchSnack = useCallback((level: 'error' | 'info' | 'success' | 'warning', message: string) => dispatch(setSnack({ level, message })), [dispatch])

  return {
    snack,
    clear: clearSnack,
    setSnack: dispatchSnack,
    error: (message: string) => dispatchSnack('error', message),
    info: (message: string) => dispatchSnack('info', message),
    success: (message: string) => dispatchSnack('success', message),
    warning: (message: string) => dispatchSnack('warning', message)
  }
}
