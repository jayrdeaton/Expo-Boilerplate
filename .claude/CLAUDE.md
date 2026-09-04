# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

# Expo-Starter

A lean, production-ready Expo starter with file-based routing, Redux, theming, and a curated set of `@rific` packages pre-wired — depends on `@rific/auto-paper`, `@rific/drawer`, `@rific/feedback-press`, `@rific/focus-chain`, `@rific/resizable-input`, `@rific/scroll-view`, `@rific/splash-gate`, `@rific/toaster`, `@rific/updater`. **This is the actual template new apps in the fleet get bootstrapped from** (Pong's own CLAUDE.md documents being scaffolded directly from this repo's already-finished config shape) — until this pass, it was itself never on the shared tooling, meaning every app bootstrapped from it *before* this fix inherited the old hand-rolled config, not the shared one.

**Expo has changed.** Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code — don't rely on general Expo knowledge, this app is on SDK 57 specifically.

## Commands

```bash
npm run lint          # expo lint .
npm run fix            # expo lint . --fix
npm test               # Jest (10 suites, 46 tests)
npm run test:watch     # Jest --watchAll
npm run typecheck      # tsc
npm run verify         # lint + test + typecheck
npm run doctor          # expo install --fix && expo-doctor
npm start              # Expo dev server
npm run client          # Expo dev server (dev client build)
```

Always run `npm run lint` before finishing any task. This is an app (`"private": true`, no publish scripts) — `verify` doesn't include a build step.

`build:development`/`build:preview`/`build:production` and `update` (which `update:development`/`update:preview`/`update:production` delegate to) are each gated behind `verify` by prefixing `npm run verify && ` directly onto the script's own definition, same as every other migrated app — see Swirlio's CLAUDE.md for the full reasoning.

## Tooling

Onboarded onto the shared `@infinitetoken` config packages (`eslint-config`, `jest-config`, `tsconfig`) — was in a genuinely half-finished, stale state, not just untouched: `jest.config.ts` already called `require('@infinitetoken/jest-config/expo')`, but `package.json` pointed that dependency at a **local `.tgz` build file that no longer exists on disk** (`file:../Jest-Config/infinitetoken-jest-config-0.1.1.tgz`, left over from dogfooding before the package was ever really published) — meaning a fresh `npm install` in this repo was actually broken before this pass. `eslint.config.cjs` and `tsconfig.json` were still the full hand-rolled shape, never touched at all.

- `eslint.config.cjs` — `@infinitetoken/eslint-config/expo`, no local override (this app's old hand-rolled config was the same standard boilerplate every other pre-migration app had).
- `tsconfig.json` — `extends: "@infinitetoken/tsconfig/expo"`, keeps only the path-valued local bits (`paths`, `include`). No `@shopify/react-native-skia` — this app has no Skia dependency at all.
- `jest.config.cjs` — `@infinitetoken/jest-config/expo`, no options at all — `jest.setup.cjs` and `roots` are both auto-detected/defaulted, `moduleNameMapper` is auto-derived from `tsconfig.json`'s own `paths`.

`npx expo install --fix` + `npm update` were run as part of this pass — genuinely found staleness (`expo`, `expo-constants`, `expo-font`, `expo-updates`, several `@rific/*` packages were all a patch or minor behind); confirmed clean afterward: `npx expo install --check` reports up to date, `npm outdated` shows `Current === Wanted` for every dependency.

**`jest.config.ts` became `jest.config.cjs`, `tsconfig.json`'s `types` array was removed, and `prettier.config.js` was deleted** in favor of `"prettier": "@infinitetoken/eslint-config/prettier"` in `package.json` — same reasons documented in BoxHockey's/Swirlio's CLAUDE.md. This app never had a `metro.config.js`, like Swirlio/Snake.

**Native/Expo module mocks moved from inline `jest.mock()` calls in `jest.setup.cjs` into individual `src/__mocks__/*.ts` files** — `react-native-reanimated`, `react-native-worklets`, `@expo/vector-icons`, `@react-native-async-storage/async-storage`, `expo-audio`, `expo-blur`, `expo-font`, `expo-linking`, `expo-splash-screen`, `react-native-gesture-handler`, `react-native-keyboard-controller`, `react-native-safe-area-context`, `redux-persist`, `redux-persist/integration/react`. Ported verbatim from this app's own pre-migration `jest.setup.ts` — content byte-identical to Snake's own extracted mocks, unsurprising since Snake was bootstrapped from this exact template. `jest.setup.cjs` now holds only genuine setup-file content.

**Migrating onto the shared eslint config surfaced 11 genuinely new `@typescript-eslint/no-explicit-any` errors**, all the identical pattern: `router.push(path as any)` in `src/app/(tabs)/index.tsx` and the `src/app/demos/*.tsx` demo screens. Confirmed (checked `app.json` for `experiments.typedRoutes` — not enabled) that expo-router's `Href` type already includes plain `string` when typed routes are off, so none of these casts were ever load-bearing — removed entirely rather than narrowed, same fix as HexFleet's identical finding.

**Migrating onto `@infinitetoken/tsconfig/expo` surfaced 6 dead `import React from 'react'` statements** across `src/__tests__/**` (leftover from before the `react-jsx` transform made them unnecessary) — removed, same pattern as every other app.

**One real bug was found in a *dependency's* source, not this app's own code — and it was already fixed upstream, just not yet installed here.** `node_modules/@rific/scroll-view/src/PullSearch.tsx` (pulled into the typecheck program via `customConditions: ["react-native"]` resolving to raw source, same mechanism as the `@shopify/react-native-skia` gotcha elsewhere in the fleet) had a `noImplicitReturns` violation in its debounce `useEffect` — but only surfaced because this app is the one place in the fleet that actually imports `PullSearch` (the `/demos/scroll-view` showcase screen). Checked `React-Native-Scroll-View`'s own source directly: the fix (`return undefined` on the non-debounce branch) was already committed there and is already published as `@rific/scroll-view@0.6.7` — this app's own `^0.6.5` range already covers it, `node_modules` was just stale. Resolved by the `npm update` in step 1, not a separate fix — nothing to change in this app's own code for this one.

`@infinitetoken/eslint-config` (`^0.2.0`), `@infinitetoken/jest-config` (`^0.2.3`), and `@infinitetoken/tsconfig` (`^0.4.1`) are all on real published versions now — the broken local `.tgz` reference is gone.

## Testing

- Framework: Jest (`@infinitetoken/jest-config/expo`, `jest-expo` preset)
- Tests live in `src/__tests__/`, mirroring the source subfolder structure
- Native/Expo module mocks live in `src/__mocks__/`, one file per module, picked up automatically (no `jest.mock()` call needed) — see Tooling above
- `jest.setup.cjs` holds only genuine setup-file concerns: process-level error handlers, RAF polyfills, the `IS_REACT_ACT_ENVIRONMENT` flag, the no-factory `NativeAnimatedHelper` automock

## Architecture

```
src/
  app/          - expo-router routes (tabs, demos/, packages/ — each demoing one @rific package)
  components/   - UI components (Providers, Theme)
  constants/    - static config
  hooks/        - custom hooks (incl. sounds/)
  redux/        - Redux Toolkit store + slices
  types/        - shared TypeScript types
  utils/        - splash gate and other helpers
  __tests__/    - test suites
  __mocks__/    - manual Jest mocks for native/Expo modules
```

## CI

`.github/workflows/ci.yml` already used the shared reusable workflow (`infinitetoken/Workflows/.github/workflows/npm-ci.yml@v1`) before this pass, just with a non-standard `run-name` (showed the PR title/commit message instead of the branch) — converged to the fleet-standard `run-name: CI — ${{ github.head_ref || github.ref_name }}` format for consistency, no functional change.
