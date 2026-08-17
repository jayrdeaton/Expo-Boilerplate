import { useAudioPlayer } from 'expo-audio'
import { useCallback } from 'react'

// Relative, not the @/ alias — static require() calls Metro's asset plugin has to resolve at
// bundle time, same convention as every other local-asset require in this codebase.
const CLICK_SOUND = require('../../assets/sounds/click.wav')
const POP_SOUND = require('../../assets/sounds/pop.wav')
const CHIME_SOUND = require('../../assets/sounds/chime.wav')
const BUZZ_SOUND = require('../../assets/sounds/buzz.wav')

// The original set, kept around as a demo-able override rather than deleted outright - see the
// Sound section of the feedback-press demo screen, which lets you A/B both sets.
const CLASSIC_CLICK_SOUND = require('../../assets/sounds/classic-click.wav')
const CLASSIC_POP_SOUND = require('../../assets/sounds/classic-pop.mp3')
const CLASSIC_CHIME_SOUND = require('../../assets/sounds/classic-chime.wav')
const CLASSIC_BUZZ_SOUND = require('../../assets/sounds/classic-buzz.wav')

// A tour of synthesis techniques the default/classic sets don't otherwise demonstrate - Karplus-Strong
// physical modeling, an 8-bit square-wave arpeggio, FM synthesis, filtered-noise subtractive synthesis,
// and ring modulation. Audition-only in the demo, not wired to any provider default.
const EXPERIMENTAL_PLUCK_SOUND = require('../../assets/sounds/experimental-pluck.wav')
const EXPERIMENTAL_BLIP_SOUND = require('../../assets/sounds/experimental-blip.wav')
const EXPERIMENTAL_BELL_SOUND = require('../../assets/sounds/experimental-bell.wav')
const EXPERIMENTAL_SWOOSH_SOUND = require('../../assets/sounds/experimental-swoosh.wav')
const EXPERIMENTAL_RING_SOUND = require('../../assets/sounds/experimental-ring.wav')

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

  const classicClickPlayer = useAudioPlayer(CLASSIC_CLICK_SOUND)
  const classicPopPlayer = useAudioPlayer(CLASSIC_POP_SOUND)
  const classicChimePlayer = useAudioPlayer(CLASSIC_CHIME_SOUND)
  const classicBuzzPlayer = useAudioPlayer(CLASSIC_BUZZ_SOUND)

  const experimentalPluckPlayer = useAudioPlayer(EXPERIMENTAL_PLUCK_SOUND)
  const experimentalBlipPlayer = useAudioPlayer(EXPERIMENTAL_BLIP_SOUND)
  const experimentalBellPlayer = useAudioPlayer(EXPERIMENTAL_BELL_SOUND)
  const experimentalSwooshPlayer = useAudioPlayer(EXPERIMENTAL_SWOOSH_SOUND)
  const experimentalRingPlayer = useAudioPlayer(EXPERIMENTAL_RING_SOUND)

  const playClick = useCallback(() => play(clickPlayer), [clickPlayer])
  const playPop = useCallback(() => play(popPlayer), [popPlayer])
  const playChime = useCallback(() => play(chimePlayer), [chimePlayer])
  const playBuzz = useCallback(() => play(buzzPlayer), [buzzPlayer])

  const playClassicClick = useCallback(() => play(classicClickPlayer), [classicClickPlayer])
  const playClassicPop = useCallback(() => play(classicPopPlayer), [classicPopPlayer])
  const playClassicChime = useCallback(() => play(classicChimePlayer), [classicChimePlayer])
  const playClassicBuzz = useCallback(() => play(classicBuzzPlayer), [classicBuzzPlayer])

  const playExperimentalPluck = useCallback(() => play(experimentalPluckPlayer), [experimentalPluckPlayer])
  const playExperimentalBlip = useCallback(() => play(experimentalBlipPlayer), [experimentalBlipPlayer])
  const playExperimentalBell = useCallback(() => play(experimentalBellPlayer), [experimentalBellPlayer])
  const playExperimentalSwoosh = useCallback(() => play(experimentalSwooshPlayer), [experimentalSwooshPlayer])
  const playExperimentalRing = useCallback(() => play(experimentalRingPlayer), [experimentalRingPlayer])

  return {
    playClick,
    playPop,
    playChime,
    playBuzz,
    playClassicClick,
    playClassicPop,
    playClassicChime,
    playClassicBuzz,
    playExperimentalPluck,
    playExperimentalBlip,
    playExperimentalBell,
    playExperimentalSwoosh,
    playExperimentalRing
  }
}
