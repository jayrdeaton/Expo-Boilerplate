// The gate mechanism itself (does markReady/useReady/pendingGates behave correctly) is tested in
// @rific/splash-gate's own package, nothing to re-prove here. What's worth guarding in THIS repo
// is that this file declares the exact set of gates the app's real async dependencies need: if a
// future screen (see Theme.tsx) picks up a new one without adding it here, or a name gets dropped
// by accident, the whole point of naming every condition explicitly is defeated silently.
import { markSplashReady, pendingSplashGates, useSplashReady } from '../../utils/splashGate'

describe('splashGate', () => {
  it('declares exactly the gates this app currently depends on', () => {
    // Each createSplashGate() import gets its own module instance in a fresh test file, so this
    // reads the still-pending set before anything in this file has marked one ready.
    expect(pendingSplashGates().sort()).toEqual(['fonts', 'theme'])
  })

  it('exposes markReady and useReady as callable functions', () => {
    expect(typeof markSplashReady).toBe('function')
    expect(typeof useSplashReady).toBe('function')
  })
})
