import settingsReducer, { defaultSettingsState, settingsActions, type SettingsState } from '../../redux/settingsSlice'

describe('settingsSlice', () => {
  describe('initial state', () => {
    it('sets debug to false', () => {
      expect(settingsReducer(undefined, { type: '@@INIT' }).debug).toBe(false)
    })

    it('matches defaultSettingsState', () => {
      expect(settingsReducer(undefined, { type: '@@INIT' })).toEqual(defaultSettingsState)
    })
  })

  describe('setDebug', () => {
    it('sets debug to true', () => {
      const state = settingsReducer(defaultSettingsState, settingsActions.setDebug(true))
      expect(state.debug).toBe(true)
    })

    it('sets debug back to false', () => {
      const modified: SettingsState = { debug: true }
      const state = settingsReducer(modified, settingsActions.setDebug(false))
      expect(state.debug).toBe(false)
    })
  })

  describe('resetSettings', () => {
    it('restores debug to false', () => {
      const modified: SettingsState = { debug: true }
      const state = settingsReducer(modified, settingsActions.resetSettings())
      expect(state.debug).toBe(false)
    })

    it('is idempotent', () => {
      const once = settingsReducer(defaultSettingsState, settingsActions.resetSettings())
      const twice = settingsReducer(once, settingsActions.resetSettings())
      expect(twice).toEqual(defaultSettingsState)
    })
  })

  describe('action creators', () => {
    it('setDebug creates action with correct type and payload', () => {
      const action = settingsActions.setDebug(true)
      expect(action.type).toBe('settings/setDebug')
      expect(action.payload).toBe(true)
    })

    it('resetSettings creates action with correct type', () => {
      const action = settingsActions.resetSettings()
      expect(action.type).toBe('settings/resetSettings')
    })
  })
})
