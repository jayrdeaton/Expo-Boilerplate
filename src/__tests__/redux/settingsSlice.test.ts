import settingsReducer, { defaultSettingsState, settingsActions, type SettingsState } from '../../redux/settingsSlice'

describe('settingsSlice', () => {
  describe('initial state', () => {
    it('sets debug to false', () => {
      expect(settingsReducer(undefined, { type: '@@INIT' }).debug).toBe(false)
    })

    it('sets soundEnabled to true', () => {
      expect(settingsReducer(undefined, { type: '@@INIT' }).soundEnabled).toBe(true)
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
      const modified: SettingsState = { debug: true, soundEnabled: true }
      const state = settingsReducer(modified, settingsActions.setDebug(false))
      expect(state.debug).toBe(false)
    })
  })

  describe('setSoundEnabled', () => {
    it('sets soundEnabled to false', () => {
      const state = settingsReducer(defaultSettingsState, settingsActions.setSoundEnabled(false))
      expect(state.soundEnabled).toBe(false)
    })

    it('sets soundEnabled back to true', () => {
      const modified: SettingsState = { debug: false, soundEnabled: false }
      const state = settingsReducer(modified, settingsActions.setSoundEnabled(true))
      expect(state.soundEnabled).toBe(true)
    })
  })

  describe('resetSettings', () => {
    it('restores debug to false', () => {
      const modified: SettingsState = { debug: true, soundEnabled: true }
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

    it('setSoundEnabled creates action with correct type and payload', () => {
      const action = settingsActions.setSoundEnabled(false)
      expect(action.type).toBe('settings/setSoundEnabled')
      expect(action.payload).toBe(false)
    })
  })
})
