import { useAudioPool } from '@rific/feedback-press/audio'

// Relative, not the @/ alias — see useDefaultSounds.ts's own comment on why static asset
// requires in this codebase stick to plain relative paths.
const GLITCH_STUTTER_SOUND = require('../../../assets/sounds/glitch-stutter.wav')
const GLITCH_CRUSH_SOUND = require('../../../assets/sounds/glitch-crush.wav')
const GLITCH_SKIP_SOUND = require('../../../assets/sounds/glitch-skip.wav')
const GLITCH_STATIC_SOUND = require('../../../assets/sounds/glitch-static.wav')

// Digital-artifact techniques (bitcrush, sample-and-hold, granular repeat) rather than
// Mechanical's analog noise transients or Experimental's clean synthesis tour - these
// deliberately introduce quantization/downsample/repeat artifacts a real recording never would.
export const useGlitchSounds = () => {
  const playGlitchStutter = useAudioPool(GLITCH_STUTTER_SOUND)
  const playGlitchCrush = useAudioPool(GLITCH_CRUSH_SOUND)
  const playGlitchSkip = useAudioPool(GLITCH_SKIP_SOUND)
  const playGlitchStatic = useAudioPool(GLITCH_STATIC_SOUND)

  return { playGlitchStutter, playGlitchCrush, playGlitchSkip, playGlitchStatic }
}
