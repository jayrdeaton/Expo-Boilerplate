import { useAudioPool } from '@rific/feedback-press/audio'

// Relative, not the @/ alias — see useDefaultSounds.ts's own comment on why static asset
// requires in this codebase stick to plain relative paths.
const MECHANICAL_SHUTTER_SOUND = require('../../../assets/sounds/mechanical-shutter.wav')
const MECHANICAL_RELAY_SOUND = require('../../../assets/sounds/mechanical-relay.wav')
const MECHANICAL_TYPEWRITER_SOUND = require('../../../assets/sounds/mechanical-typewriter.wav')
const MECHANICAL_LATCH_SOUND = require('../../../assets/sounds/mechanical-latch.wav')

// Every other pack is pure-tone synthesis (sine stacks, sweeps). This one is built from filtered
// white noise instead - shutters, switches, and keys are noise-driven transients in the real
// world, not sine waves. Theme-named like retro/experimental since it's not filling the
// click/pop/chime/buzz roles.
export const useMechanicalSounds = () => {
  const playMechanicalShutter = useAudioPool(MECHANICAL_SHUTTER_SOUND)
  const playMechanicalRelay = useAudioPool(MECHANICAL_RELAY_SOUND)
  const playMechanicalTypewriter = useAudioPool(MECHANICAL_TYPEWRITER_SOUND)
  const playMechanicalLatch = useAudioPool(MECHANICAL_LATCH_SOUND)

  return { playMechanicalShutter, playMechanicalRelay, playMechanicalTypewriter, playMechanicalLatch }
}
