import { useAudioPool } from '@rific/feedback-press/audio'

// Relative, not the @/ alias — see useDefaultSounds.ts's own comment on why static asset
// requires in this codebase stick to plain relative paths.
const RETRO_BLIP_SOUND = require('../../../assets/sounds/retro-blip.wav')
const RETRO_TICK_SOUND = require('../../../assets/sounds/retro-tick.wav')
const RETRO_BLIP_REVERSE_SOUND = require('../../../assets/sounds/retro-blip-reverse.wav')
const RETRO_JUMP_SOUND = require('../../../assets/sounds/retro-jump.wav')
const RETRO_LASER_SOUND = require('../../../assets/sounds/retro-laser.wav')
const RETRO_POWERUP_SOUND = require('../../../assets/sounds/retro-powerup.wav')

// Chiptune/8-bit square-wave sounds - a distinct family from the synth techniques in the other
// packs, so it gets its own audition row in the demo. Blip-reverse is retro-blip.wav's own
// samples played backwards, not a separately composed sound.
export const useRetroSounds = () => {
  const playRetroBlip = useAudioPool(RETRO_BLIP_SOUND)
  const playRetroTick = useAudioPool(RETRO_TICK_SOUND)
  const playRetroBlipReverse = useAudioPool(RETRO_BLIP_REVERSE_SOUND)
  const playRetroJump = useAudioPool(RETRO_JUMP_SOUND)
  const playRetroLaser = useAudioPool(RETRO_LASER_SOUND)
  const playRetroPowerup = useAudioPool(RETRO_POWERUP_SOUND)

  return { playRetroBlip, playRetroTick, playRetroBlipReverse, playRetroJump, playRetroLaser, playRetroPowerup }
}
