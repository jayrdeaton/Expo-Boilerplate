import store, { snackActions } from '../store'

const { setSnack } = snackActions

export const snack = {
  error: (message: string) => {
    store.dispatch(
      setSnack({
        level: 'error',
        message
      })
    )
  },
  info: (message: string) => {
    store.dispatch(
      setSnack({
        level: 'info',
        message
      })
    )
  },
  success: (message: string) => {
    store.dispatch(
      setSnack({
        level: 'success',
        message
      })
    )
  },
  warning: (message: string) => {
    store.dispatch(
      setSnack({
        level: 'warning',
        message
      })
    )
  }
}

export default snack
