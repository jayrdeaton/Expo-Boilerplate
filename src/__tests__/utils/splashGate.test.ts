/* eslint-disable @typescript-eslint/no-require-imports */
// splashGate holds module-level Set state, so each test resets the module
// to get a fresh gate set. expo-splash-screen is mocked in jest.setup.ts.

describe('splashGate', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  const load = () => require('../../utils/splashGate') as typeof import('../../utils/splashGate')

  const splash = () => require('expo-splash-screen') as typeof import('expo-splash-screen')

  it('does not hide splash while any gate remains open', () => {
    const { addGate, clearGate } = load()
    addGate('a')
    addGate('b')
    clearGate('a')
    expect(splash().hideAsync).not.toHaveBeenCalled()
  })

  it('hides splash when the only gate is cleared', () => {
    const { addGate, clearGate } = load()
    addGate('theme')
    clearGate('theme')
    expect(splash().hideAsync).toHaveBeenCalledTimes(1)
  })

  it('hides splash only after every gate is cleared', () => {
    const { addGate, clearGate } = load()
    addGate('theme')
    addGate('fonts')
    addGate('data')
    clearGate('fonts')
    clearGate('theme')
    expect(splash().hideAsync).not.toHaveBeenCalled()
    clearGate('data')
    expect(splash().hideAsync).toHaveBeenCalledTimes(1)
  })

  it('does not hide splash when clearing an unknown key if other gates remain', () => {
    const { addGate, clearGate } = load()
    addGate('a')
    clearGate('nonexistent')
    expect(splash().hideAsync).not.toHaveBeenCalled()
  })

  it('calls hideAsync again when clearGate is called with gate set already empty', () => {
    // Documents the current behavior: clearGate always calls tryHide after delete,
    // so repeated clears on an empty set each trigger hideAsync.
    const { addGate, clearGate } = load()
    addGate('a')
    clearGate('a')
    clearGate('a')
    expect(splash().hideAsync).toHaveBeenCalledTimes(2)
  })

  it('adding the same gate key twice does not require two clears', () => {
    const { addGate, clearGate } = load()
    addGate('a')
    addGate('a') // Set deduplicates — still one key
    clearGate('a')
    expect(splash().hideAsync).toHaveBeenCalledTimes(1)
  })
})
