import { useAudioPool } from '@rific/feedback-press/audio'

// Relative, not the @/ alias — see useDefaultSounds.ts's own comment on why static asset
// requires in this codebase stick to plain relative paths.
const MINIMAL_CLICK_SOUND = require('../../../assets/sounds/minimal-click.wav')
const MINIMAL_POP_SOUND = require('../../../assets/sounds/minimal-pop.wav')
const MINIMAL_CHIME_SOUND = require('../../../assets/sounds/minimal-chime.wav')
const MINIMAL_BUZZ_SOUND = require('../../../assets/sounds/minimal-buzz.wav')

// Same four roles again, but the opposite instinct from Warm: brevity and cleanliness are the
// whole character rather than pitch/warmth variety - a single clean high sine per sound, near-
// zero decay tail, like a modern trackpad click or system UI sound. Pop still outlasts click
// (long-press payoff vs. immediate cue), it just stays short in absolute terms.
export const useMinimalSounds = () => {
  const playMinimalClick = useAudioPool(MINIMAL_CLICK_SOUND)
  const playMinimalPop = useAudioPool(MINIMAL_POP_SOUND)
  const playMinimalChime = useAudioPool(MINIMAL_CHIME_SOUND)
  const playMinimalBuzz = useAudioPool(MINIMAL_BUZZ_SOUND)

  return { playMinimalClick, playMinimalPop, playMinimalChime, playMinimalBuzz }
}
