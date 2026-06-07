// createThemeReducer is called at module level in store.ts — mock it before import.
import { settingsActions } from '../../redux/settingsSlice'
import { persistor, store } from '../../redux/store'

jest.mock('@rific/auto-paper', () => ({
  createThemeReducer:
    () =>
    (state = { appearance: 'auto', color: '#4caf50' }) =>
      state
}))

describe('store', () => {
  beforeEach(() => {
    store.dispatch(settingsActions.resetSettings())
  })

  describe('state shape', () => {
    it('exposes a settings key', () => {
      expect(store.getState()).toHaveProperty('settings')
    })

    it('exposes a theme key', () => {
      expect(store.getState()).toHaveProperty('theme')
    })

    it('initializes settings with correct defaults', () => {
      expect(store.getState().settings).toEqual({
        blur: true,
        vibrate: true,
        debug: false
      })
    })

    it('initializes theme from createThemeReducer', () => {
      const { theme } = store.getState()
      expect(theme).toHaveProperty('appearance')
      expect(theme).toHaveProperty('color')
    })
  })

  describe('persistor', () => {
    it('is defined', () => {
      expect(persistor).toBeDefined()
    })
  })

  describe('errorMiddleware', () => {
    it('swallows actions that carry a truthy error field', () => {
      // setDebug would change debug to true if it reached the reducer
      store.dispatch({ type: 'settings/setDebug', payload: true, error: true } as never)
      expect(store.getState().settings.debug).toBe(false)
    })

    it('passes normal actions through to the reducer', () => {
      store.dispatch(settingsActions.setDebug(true))
      expect(store.getState().settings.debug).toBe(true)
    })

    it('does not swallow actions whose error field is falsy', () => {
      store.dispatch({ type: 'settings/setBlur', payload: false, error: false } as never)
      expect(store.getState().settings.blur).toBe(false)
    })

    it('does not swallow actions with no error field', () => {
      store.dispatch(settingsActions.setVibrate(false))
      expect(store.getState().settings.vibrate).toBe(false)
    })
  })
})
