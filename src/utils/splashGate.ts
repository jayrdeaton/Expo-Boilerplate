import { createSplashGate } from '@rific/splash-gate'

// Every async condition the very first screen depends on, named once here so nothing can be
// forgotten silently. See Theme.tsx for where each one actually reports in. Add a new gate here,
// and mark it ready from wherever it resolves, any time a future screen picks up a new async
// dependency of its own (a hydrated preference, an auth check, ...).
export const { markReady: markSplashReady, useReady: useSplashReady, pendingGates: pendingSplashGates } = createSplashGate(['theme', 'fonts'] as const)
