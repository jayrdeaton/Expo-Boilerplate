import { useAudioPool } from '@rific/feedback-press/audio'

// Relative, not the @/ alias — see useDefaultSounds.ts's own comment on why static asset
// requires in this codebase stick to plain relative paths.
const LOFI_CLICK_SOUND = require('../../../assets/sounds/lofi-click.wav')
const LOFI_POP_SOUND = require('../../../assets/sounds/lofi-pop.wav')
const LOFI_CHIME_SOUND = require('../../../assets/sounds/lofi-chime.wav')
const LOFI_BUZZ_SOUND = require('../../../assets/sounds/lofi-buzz.wav')

// Same four roles, built with heavy low-pass filtering plus soft-clip saturation and a trace of
// vinyl-crackle noise under the chime - warm and dull rather than crisp, the "cassette tape" end
// of the spectrum none of the other role-named packs cover.
export const useLofiSounds = () => {
  const playLofiClick = useAudioPool(LOFI_CLICK_SOUND)
  const playLofiPop = useAudioPool(LOFI_POP_SOUND)
  const playLofiChime = useAudioPool(LOFI_CHIME_SOUND)
  const playLofiBuzz = useAudioPool(LOFI_BUZZ_SOUND)

  return { playLofiClick, playLofiPop, playLofiChime, playLofiBuzz }
}
