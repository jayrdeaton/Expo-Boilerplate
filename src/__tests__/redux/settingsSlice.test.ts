import settingsReducer, { settingsActions, SettingsState } from '../../redux/settingsSlice'

const initial: SettingsState = { blur: true, vibrate: true, debug: false }

describe('settingsSlice', () => {
  describe('initial state', () => {
    it('sets blur to true', () => {
      expect(settingsReducer(undefined, { type: '@@INIT' }).blur).toBe(true)
    })

    it('sets vibrate to true', () => {
      expect(settingsReducer(undefined, { type: '@@INIT' }).vibrate).toBe(true)
    })

    it('sets debug to false', () => {
      expect(settingsReducer(undefined, { type: '@@INIT' }).debug).toBe(false)
    })
  })

  describe('setBlur', () => {
    it('sets blur to false', () => {
      const state = settingsReducer(initial, settingsActions.setBlur(false))
      expect(state.blur).toBe(false)
    })

    it('sets blur back to true', () => {
      const state = settingsReducer({ ...initial, blur: false }, settingsActions.setBlur(true))
      expect(state.blur).toBe(true)
    })

    it('does not touch vibrate or debug', () => {
      const state = settingsReducer(initial, settingsActions.setBlur(false))
      expect(state.vibrate).toBe(true)
      expect(state.debug).toBe(false)
    })
  })

  describe('setVibrate', () => {
    it('sets vibrate to false', () => {
      const state = settingsReducer(initial, settingsActions.setVibrate(false))
      expect(state.vibrate).toBe(false)
    })

    it('sets vibrate back to true', () => {
      const state = settingsReducer({ ...initial, vibrate: false }, settingsActions.setVibrate(true))
      expect(state.vibrate).toBe(true)
    })

    it('does not touch blur or debug', () => {
      const state = settingsReducer(initial, settingsActions.setVibrate(false))
      expect(state.blur).toBe(true)
      expect(state.debug).toBe(false)
    })
  })

  describe('setDebug', () => {
    it('sets debug to true', () => {
      const state = settingsReducer(initial, settingsActions.setDebug(true))
      expect(state.debug).toBe(true)
    })

    it('sets debug back to false', () => {
      const state = settingsReducer({ ...initial, debug: true }, settingsActions.setDebug(false))
      expect(state.debug).toBe(false)
    })

    it('does not touch blur or vibrate', () => {
      const state = settingsReducer(initial, settingsActions.setDebug(true))
      expect(state.blur).toBe(true)
      expect(state.vibrate).toBe(true)
    })
  })

  describe('resetSettings', () => {
    it('restores all fields to initial values', () => {
      const modified: SettingsState = { blur: false, vibrate: false, debug: true }
      const state = settingsReducer(modified, settingsActions.resetSettings())
      expect(state).toEqual(initial)
    })

    it('is idempotent', () => {
      const once = settingsReducer(initial, settingsActions.resetSettings())
      const twice = settingsReducer(once, settingsActions.resetSettings())
      expect(twice).toEqual(initial)
    })
  })

  describe('action creators', () => {
    it('setBlur creates action with correct type and payload', () => {
      const action = settingsActions.setBlur(false)
      expect(action.type).toBe('settings/setBlur')
      expect(action.payload).toBe(false)
    })

    it('setVibrate creates action with correct type and payload', () => {
      const action = settingsActions.setVibrate(false)
      expect(action.type).toBe('settings/setVibrate')
      expect(action.payload).toBe(false)
    })

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
