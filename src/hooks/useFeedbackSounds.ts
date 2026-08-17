import { useClassicSounds } from './sounds/useClassicSounds'
import { useDefaultSounds } from './sounds/useDefaultSounds'
import { useExperimentalSounds } from './sounds/useExperimentalSounds'
import { useGlitchSounds } from './sounds/useGlitchSounds'
import { useLofiSounds } from './sounds/useLofiSounds'
import { useMechanicalSounds } from './sounds/useMechanicalSounds'
import { useMinimalSounds } from './sounds/useMinimalSounds'
import { useNatureSounds } from './sounds/useNatureSounds'
import { useRetroSounds } from './sounds/useRetroSounds'
import { useWarmSounds } from './sounds/useWarmSounds'

// Aggregates every sound pack (./sounds/use*Sounds.ts) into one flat object, for the
// feedback-press demo's full sampler - the only place all 42 sounds are used at once. Each pack
// is its own self-contained hook + asset files, so lifting just the one(s) you like into another
// app means copying that one file (plus its assets/sounds/*.wav) rather than this whole tree.
// Providers.tsx calls useDefaultSounds() directly instead of this aggregator, so the app-wide
// provider default isn't paying for all ten packs' worth of pooled players just to use one.
export const useFeedbackSounds = () => {
  const defaultSounds = useDefaultSounds()
  const classicSounds = useClassicSounds()
  const warmSounds = useWarmSounds()
  const minimalSounds = useMinimalSounds()
  const lofiSounds = useLofiSounds()
  const retroSounds = useRetroSounds()
  const experimentalSounds = useExperimentalSounds()
  const mechanicalSounds = useMechanicalSounds()
  const glitchSounds = useGlitchSounds()
  const natureSounds = useNatureSounds()

  return {
    ...defaultSounds,
    ...classicSounds,
    ...warmSounds,
    ...minimalSounds,
    ...lofiSounds,
    ...retroSounds,
    ...experimentalSounds,
    ...mechanicalSounds,
    ...glitchSounds,
    ...natureSounds
  }
}
