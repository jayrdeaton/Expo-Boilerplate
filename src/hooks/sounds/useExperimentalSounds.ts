import { useAudioPool } from '@rific/feedback-press/audio'

// Relative, not the @/ alias — see useDefaultSounds.ts's own comment on why static asset
// requires in this codebase stick to plain relative paths.
const EXPERIMENTAL_PLUCK_SOUND = require('../../../assets/sounds/experimental-pluck.wav')
const EXPERIMENTAL_BELL_SOUND = require('../../../assets/sounds/experimental-bell.wav')
const EXPERIMENTAL_SWOOSH_SOUND = require('../../../assets/sounds/experimental-swoosh.wav')
const EXPERIMENTAL_RING_SOUND = require('../../../assets/sounds/experimental-ring.wav')

// A tour of synthesis techniques the other packs don't otherwise demonstrate - Karplus-Strong
// physical modeling, FM synthesis, filtered-noise subtractive synthesis, and ring modulation.
// Audition-only in the demo, not wired to any provider default.
export const useExperimentalSounds = () => {
  const playExperimentalPluck = useAudioPool(EXPERIMENTAL_PLUCK_SOUND)
  const playExperimentalBell = useAudioPool(EXPERIMENTAL_BELL_SOUND)
  const playExperimentalSwoosh = useAudioPool(EXPERIMENTAL_SWOOSH_SOUND)
  const playExperimentalRing = useAudioPool(EXPERIMENTAL_RING_SOUND)

  return { playExperimentalPluck, playExperimentalBell, playExperimentalSwoosh, playExperimentalRing }
}
