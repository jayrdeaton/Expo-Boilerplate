import { useAudioPlayer } from 'expo-audio'
import { useCallback } from 'react'

// Relative, not the @/ alias — static require() calls Metro's asset plugin has to resolve at
// bundle time, same convention as every other local-asset require in this codebase.
const CLICK_SOUND = require('../../assets/sounds/click.wav')
const POP_SOUND = require('../../assets/sounds/pop.wav')
const CHIME_SOUND = require('../../assets/sounds/chime.wav')
const BUZZ_SOUND = require('../../assets/sounds/buzz.wav')

// Deferred a tick via setTimeout, seekTo(0) before play() — expo-audio's play() blocks the
// native UI thread synchronously on Android, so firing it inline from a press handler adds that
// round-trip latency to the very state update the press triggers. seekTo(0) restarts a clip
// that's already playing or finished instead of no-oping.
const play = (player: ReturnType<typeof useAudioPlayer>) => {
  setTimeout(() => {
    void player.seekTo(0).then(() => player.play())
  }, 0)
}

export const useFeedbackSounds = () => {
  const clickPlayer = useAudioPlayer(CLICK_SOUND)
  const popPlayer = useAudioPlayer(POP_SOUND)
  const chimePlayer = useAudioPlayer(CHIME_SOUND)
  const buzzPlayer = useAudioPlayer(BUZZ_SOUND)

  const playClick = useCallback(() => play(clickPlayer), [clickPlayer])
  const playPop = useCallback(() => play(popPlayer), [popPlayer])
  const playChime = useCallback(() => play(chimePlayer), [chimePlayer])
  const playBuzz = useCallback(() => play(buzzPlayer), [buzzPlayer])

  return { playClick, playPop, playChime, playBuzz }
}
