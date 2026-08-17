import { useAudioPool } from '@rific/feedback-press/audio'

// Relative, not the @/ alias — see useDefaultSounds.ts's own comment on why static asset
// requires in this codebase stick to plain relative paths.
const NATURE_DROPLET_SOUND = require('../../../assets/sounds/nature-droplet.wav')
const NATURE_CHIRP_SOUND = require('../../../assets/sounds/nature-chirp.wav')
const NATURE_RUSTLE_SOUND = require('../../../assets/sounds/nature-rustle.wav')
const NATURE_SPLASH_SOUND = require('../../../assets/sounds/nature-splash.wav')

// A physical-world counterpart to Mechanical - noise-driven like that pack, but pitch-bent
// resonance and soft band-passed textures instead of sharp metallic transients, for an organic
// rather than man-made character.
export const useNatureSounds = () => {
  const playNatureDroplet = useAudioPool(NATURE_DROPLET_SOUND)
  const playNatureChirp = useAudioPool(NATURE_CHIRP_SOUND)
  const playNatureRustle = useAudioPool(NATURE_RUSTLE_SOUND)
  const playNatureSplash = useAudioPool(NATURE_SPLASH_SOUND)

  return { playNatureDroplet, playNatureChirp, playNatureRustle, playNatureSplash }
}
