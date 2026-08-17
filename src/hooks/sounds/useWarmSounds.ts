import { useAudioPool } from '@rific/feedback-press/audio'

// Relative, not the @/ alias — see useDefaultSounds.ts's own comment on why static asset
// requires in this codebase stick to plain relative paths.
const WARM_CLICK_SOUND = require('../../../assets/sounds/warm-click.wav')
const WARM_POP_SOUND = require('../../../assets/sounds/warm-pop.wav')
const WARM_CHIME_SOUND = require('../../../assets/sounds/warm-chime.wav')
const WARM_BUZZ_SOUND = require('../../../assets/sounds/warm-buzz.wav')

// Same click/pop/chime/buzz roles as default/classic, for a direct A/B, but each voice is
// deliberately spread across pitch and warmth (bright short click down through a low, round
// buzz) rather than sharing one register - and duration follows role, not just taste: pop is the
// long-press payoff so it's given real length, click stays snappy since it's the immediate cue.
export const useWarmSounds = () => {
  const playWarmClick = useAudioPool(WARM_CLICK_SOUND)
  const playWarmPop = useAudioPool(WARM_POP_SOUND)
  const playWarmChime = useAudioPool(WARM_CHIME_SOUND)
  const playWarmBuzz = useAudioPool(WARM_BUZZ_SOUND)

  return { playWarmClick, playWarmPop, playWarmChime, playWarmBuzz }
}
