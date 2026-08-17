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

// Chiptune/8-bit square-wave sounds - a distinct family from the synth techniques below, so it
// gets its own audition row in the demo. Blip-reverse is retro-blip.wav's own samples played
// backwards, not a separately composed sound.
const RETRO_BLIP_SOUND = require('../../assets/sounds/retro-blip.wav')
const RETRO_TICK_SOUND = require('../../assets/sounds/retro-tick.wav')
const RETRO_BLIP_REVERSE_SOUND = require('../../assets/sounds/retro-blip-reverse.wav')
const RETRO_JUMP_SOUND = require('../../assets/sounds/retro-jump.wav')
const RETRO_LASER_SOUND = require('../../assets/sounds/retro-laser.wav')
const RETRO_POWERUP_SOUND = require('../../assets/sounds/retro-powerup.wav')

// A tour of synthesis techniques the default/classic/retro sets don't otherwise demonstrate -
// Karplus-Strong physical modeling, FM synthesis, filtered-noise subtractive synthesis, and ring
// modulation. Audition-only in the demo, not wired to any provider default.
const EXPERIMENTAL_PLUCK_SOUND = require('../../assets/sounds/experimental-pluck.wav')
const EXPERIMENTAL_BELL_SOUND = require('../../assets/sounds/experimental-bell.wav')
const EXPERIMENTAL_SWOOSH_SOUND = require('../../assets/sounds/experimental-swoosh.wav')
const EXPERIMENTAL_RING_SOUND = require('../../assets/sounds/experimental-ring.wav')

// Same click/pop/chime/buzz roles as default/classic, for a direct A/B, but each voice is
// deliberately spread across pitch and warmth (bright short click down through a low, round
// buzz) rather than sharing one register - and duration follows role, not just taste: pop is the
// long-press payoff so it's given real length, click stays snappy since it's the immediate cue.
const WARM_CLICK_SOUND = require('../../assets/sounds/warm-click.wav')
const WARM_POP_SOUND = require('../../assets/sounds/warm-pop.wav')
const WARM_CHIME_SOUND = require('../../assets/sounds/warm-chime.wav')
const WARM_BUZZ_SOUND = require('../../assets/sounds/warm-buzz.wav')

// Same four roles again, but the opposite instinct from Warm: brevity and cleanliness are the
// whole character rather than pitch/warmth variety - a single clean high sine per sound, near-
// zero decay tail, like a modern trackpad click or system UI sound. Pop still outlasts click
// (long-press payoff vs. immediate cue), it just stays short in absolute terms.
const MINIMAL_CLICK_SOUND = require('../../assets/sounds/minimal-click.wav')
const MINIMAL_POP_SOUND = require('../../assets/sounds/minimal-pop.wav')
const MINIMAL_CHIME_SOUND = require('../../assets/sounds/minimal-chime.wav')
const MINIMAL_BUZZ_SOUND = require('../../assets/sounds/minimal-buzz.wav')

// Every pack above is pure-tone synthesis (sine stacks, sweeps). This one is built from filtered
// white noise instead - shutters, switches, and keys are noise-driven transients in the real
// world, not sine waves. Theme-named like retro/experimental since it's not filling the
// click/pop/chime/buzz roles.
const MECHANICAL_SHUTTER_SOUND = require('../../assets/sounds/mechanical-shutter.wav')
const MECHANICAL_RELAY_SOUND = require('../../assets/sounds/mechanical-relay.wav')
const MECHANICAL_TYPEWRITER_SOUND = require('../../assets/sounds/mechanical-typewriter.wav')
const MECHANICAL_LATCH_SOUND = require('../../assets/sounds/mechanical-latch.wav')

// Same four roles, built with heavy low-pass filtering plus soft-clip saturation and a trace of
// vinyl-crackle noise under the chime - warm and dull rather than crisp, the "cassette tape" end
// of the spectrum none of the other role-named packs cover.
const LOFI_CLICK_SOUND = require('../../assets/sounds/lofi-click.wav')
const LOFI_POP_SOUND = require('../../assets/sounds/lofi-pop.wav')
const LOFI_CHIME_SOUND = require('../../assets/sounds/lofi-chime.wav')
const LOFI_BUZZ_SOUND = require('../../assets/sounds/lofi-buzz.wav')

// Digital-artifact techniques (bitcrush, sample-and-hold, granular repeat) rather than
// Mechanical's analog noise transients or Experimental's clean synthesis tour - these
// deliberately introduce quantization/downsample/repeat artifacts a real recording never would.
const GLITCH_STUTTER_SOUND = require('../../assets/sounds/glitch-stutter.wav')
const GLITCH_CRUSH_SOUND = require('../../assets/sounds/glitch-crush.wav')
const GLITCH_SKIP_SOUND = require('../../assets/sounds/glitch-skip.wav')
const GLITCH_STATIC_SOUND = require('../../assets/sounds/glitch-static.wav')

// A physical-world counterpart to Mechanical - noise-driven like that pack, but pitch-bent
// resonance and soft band-passed textures instead of sharp metallic transients, for an organic
// rather than man-made character.
const NATURE_DROPLET_SOUND = require('../../assets/sounds/nature-droplet.wav')
const NATURE_CHIRP_SOUND = require('../../assets/sounds/nature-chirp.wav')
const NATURE_RUSTLE_SOUND = require('../../assets/sounds/nature-rustle.wav')
const NATURE_SPLASH_SOUND = require('../../assets/sounds/nature-splash.wav')

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

  const retroBlipPlayer = useAudioPlayer(RETRO_BLIP_SOUND)
  const retroTickPlayer = useAudioPlayer(RETRO_TICK_SOUND)
  const retroBlipReversePlayer = useAudioPlayer(RETRO_BLIP_REVERSE_SOUND)
  const retroJumpPlayer = useAudioPlayer(RETRO_JUMP_SOUND)
  const retroLaserPlayer = useAudioPlayer(RETRO_LASER_SOUND)
  const retroPowerupPlayer = useAudioPlayer(RETRO_POWERUP_SOUND)

  const experimentalPluckPlayer = useAudioPlayer(EXPERIMENTAL_PLUCK_SOUND)
  const experimentalBellPlayer = useAudioPlayer(EXPERIMENTAL_BELL_SOUND)
  const experimentalSwooshPlayer = useAudioPlayer(EXPERIMENTAL_SWOOSH_SOUND)
  const experimentalRingPlayer = useAudioPlayer(EXPERIMENTAL_RING_SOUND)

  const warmClickPlayer = useAudioPlayer(WARM_CLICK_SOUND)
  const warmPopPlayer = useAudioPlayer(WARM_POP_SOUND)
  const warmChimePlayer = useAudioPlayer(WARM_CHIME_SOUND)
  const warmBuzzPlayer = useAudioPlayer(WARM_BUZZ_SOUND)

  const minimalClickPlayer = useAudioPlayer(MINIMAL_CLICK_SOUND)
  const minimalPopPlayer = useAudioPlayer(MINIMAL_POP_SOUND)
  const minimalChimePlayer = useAudioPlayer(MINIMAL_CHIME_SOUND)
  const minimalBuzzPlayer = useAudioPlayer(MINIMAL_BUZZ_SOUND)

  const mechanicalShutterPlayer = useAudioPlayer(MECHANICAL_SHUTTER_SOUND)
  const mechanicalRelayPlayer = useAudioPlayer(MECHANICAL_RELAY_SOUND)
  const mechanicalTypewriterPlayer = useAudioPlayer(MECHANICAL_TYPEWRITER_SOUND)
  const mechanicalLatchPlayer = useAudioPlayer(MECHANICAL_LATCH_SOUND)

  const lofiClickPlayer = useAudioPlayer(LOFI_CLICK_SOUND)
  const lofiPopPlayer = useAudioPlayer(LOFI_POP_SOUND)
  const lofiChimePlayer = useAudioPlayer(LOFI_CHIME_SOUND)
  const lofiBuzzPlayer = useAudioPlayer(LOFI_BUZZ_SOUND)

  const glitchStutterPlayer = useAudioPlayer(GLITCH_STUTTER_SOUND)
  const glitchCrushPlayer = useAudioPlayer(GLITCH_CRUSH_SOUND)
  const glitchSkipPlayer = useAudioPlayer(GLITCH_SKIP_SOUND)
  const glitchStaticPlayer = useAudioPlayer(GLITCH_STATIC_SOUND)

  const natureDropletPlayer = useAudioPlayer(NATURE_DROPLET_SOUND)
  const natureChirpPlayer = useAudioPlayer(NATURE_CHIRP_SOUND)
  const natureRustlePlayer = useAudioPlayer(NATURE_RUSTLE_SOUND)
  const natureSplashPlayer = useAudioPlayer(NATURE_SPLASH_SOUND)

  const playClick = useCallback(() => play(clickPlayer), [clickPlayer])
  const playPop = useCallback(() => play(popPlayer), [popPlayer])
  const playChime = useCallback(() => play(chimePlayer), [chimePlayer])
  const playBuzz = useCallback(() => play(buzzPlayer), [buzzPlayer])

  const playClassicClick = useCallback(() => play(classicClickPlayer), [classicClickPlayer])
  const playClassicPop = useCallback(() => play(classicPopPlayer), [classicPopPlayer])
  const playClassicChime = useCallback(() => play(classicChimePlayer), [classicChimePlayer])
  const playClassicBuzz = useCallback(() => play(classicBuzzPlayer), [classicBuzzPlayer])

  const playRetroBlip = useCallback(() => play(retroBlipPlayer), [retroBlipPlayer])
  const playRetroTick = useCallback(() => play(retroTickPlayer), [retroTickPlayer])
  const playRetroBlipReverse = useCallback(() => play(retroBlipReversePlayer), [retroBlipReversePlayer])
  const playRetroJump = useCallback(() => play(retroJumpPlayer), [retroJumpPlayer])
  const playRetroLaser = useCallback(() => play(retroLaserPlayer), [retroLaserPlayer])
  const playRetroPowerup = useCallback(() => play(retroPowerupPlayer), [retroPowerupPlayer])

  const playExperimentalPluck = useCallback(() => play(experimentalPluckPlayer), [experimentalPluckPlayer])
  const playExperimentalBell = useCallback(() => play(experimentalBellPlayer), [experimentalBellPlayer])
  const playExperimentalSwoosh = useCallback(() => play(experimentalSwooshPlayer), [experimentalSwooshPlayer])
  const playExperimentalRing = useCallback(() => play(experimentalRingPlayer), [experimentalRingPlayer])

  const playWarmClick = useCallback(() => play(warmClickPlayer), [warmClickPlayer])
  const playWarmPop = useCallback(() => play(warmPopPlayer), [warmPopPlayer])
  const playWarmChime = useCallback(() => play(warmChimePlayer), [warmChimePlayer])
  const playWarmBuzz = useCallback(() => play(warmBuzzPlayer), [warmBuzzPlayer])

  const playMinimalClick = useCallback(() => play(minimalClickPlayer), [minimalClickPlayer])
  const playMinimalPop = useCallback(() => play(minimalPopPlayer), [minimalPopPlayer])
  const playMinimalChime = useCallback(() => play(minimalChimePlayer), [minimalChimePlayer])
  const playMinimalBuzz = useCallback(() => play(minimalBuzzPlayer), [minimalBuzzPlayer])

  const playMechanicalShutter = useCallback(() => play(mechanicalShutterPlayer), [mechanicalShutterPlayer])
  const playMechanicalRelay = useCallback(() => play(mechanicalRelayPlayer), [mechanicalRelayPlayer])
  const playMechanicalTypewriter = useCallback(() => play(mechanicalTypewriterPlayer), [mechanicalTypewriterPlayer])
  const playMechanicalLatch = useCallback(() => play(mechanicalLatchPlayer), [mechanicalLatchPlayer])

  const playLofiClick = useCallback(() => play(lofiClickPlayer), [lofiClickPlayer])
  const playLofiPop = useCallback(() => play(lofiPopPlayer), [lofiPopPlayer])
  const playLofiChime = useCallback(() => play(lofiChimePlayer), [lofiChimePlayer])
  const playLofiBuzz = useCallback(() => play(lofiBuzzPlayer), [lofiBuzzPlayer])

  const playGlitchStutter = useCallback(() => play(glitchStutterPlayer), [glitchStutterPlayer])
  const playGlitchCrush = useCallback(() => play(glitchCrushPlayer), [glitchCrushPlayer])
  const playGlitchSkip = useCallback(() => play(glitchSkipPlayer), [glitchSkipPlayer])
  const playGlitchStatic = useCallback(() => play(glitchStaticPlayer), [glitchStaticPlayer])

  const playNatureDroplet = useCallback(() => play(natureDropletPlayer), [natureDropletPlayer])
  const playNatureChirp = useCallback(() => play(natureChirpPlayer), [natureChirpPlayer])
  const playNatureRustle = useCallback(() => play(natureRustlePlayer), [natureRustlePlayer])
  const playNatureSplash = useCallback(() => play(natureSplashPlayer), [natureSplashPlayer])

  return {
    playClick,
    playPop,
    playChime,
    playBuzz,
    playClassicClick,
    playClassicPop,
    playClassicChime,
    playClassicBuzz,
    playRetroBlip,
    playRetroTick,
    playRetroBlipReverse,
    playRetroJump,
    playRetroLaser,
    playRetroPowerup,
    playExperimentalPluck,
    playExperimentalBell,
    playExperimentalSwoosh,
    playExperimentalRing,
    playWarmClick,
    playWarmPop,
    playWarmChime,
    playWarmBuzz,
    playMinimalClick,
    playMinimalPop,
    playMinimalChime,
    playMinimalBuzz,
    playMechanicalShutter,
    playMechanicalRelay,
    playMechanicalTypewriter,
    playMechanicalLatch,
    playLofiClick,
    playLofiPop,
    playLofiChime,
    playLofiBuzz,
    playGlitchStutter,
    playGlitchCrush,
    playGlitchSkip,
    playGlitchStatic,
    playNatureDroplet,
    playNatureChirp,
    playNatureRustle,
    playNatureSplash
  }
}
