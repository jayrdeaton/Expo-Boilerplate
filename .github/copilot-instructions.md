# Copilot instructions — CashierFu-Utility

## Project map (how the app is wired)
- Expo / React Native (TypeScript). App entrypoint is `App.tsx` (there is no `src/index.tsx`).
- Bootstrapping happens in `src/components/Providers.tsx`: Redux Toolkit + `redux-persist`, TanStack React Query, keyboard + safe-area providers.
- Navigation is nested:
  - Root stack: `src/navigation/index.tsx` chooses `auth` vs `navigator` vs `offline` and prompts OTA updates on foreground.
  - Drawer: `src/navigation/Navigator.tsx` hosts the main sections; per-domain stacks live in `src/navigation/Stack/*`.
  - Route name is persisted in Redux (`src/store/routeSlice.ts`) via `src/hooks/useRoute.ts` and validated against allowed drawer keys.

## Conventions (follow existing patterns)
- Prefer `@cashierfu/kit` for domain models/utilities (e.g. `Product`, `Container`, `Unit`, `Image`, `generateUuid`).
- Ignore legacy code/paths containing `Old` (e.g. `src/navigation/UnitizeOld/*`) unless a task explicitly calls for it.
- Prefer barrel imports from `src/components` + `src/hooks`:
  - `import { Button } from '../components'`
  - `import { useAuth, useAPI } from '../hooks'`
- State lives in Redux slices under `src/store/*Slice.ts` and is persisted via `src/store/index.ts` (AsyncStorage). Actions are re-exported from `src/store/index.ts` as `*_Actions`.
- Server/data access goes through `src/hooks/useAPI.ts` (base URL switches via auth `development` flag; throws on non-2xx / `success !== true`). Use existing cache helpers like `src/utils/updateQueryItem.ts` after mutations.
- UI theme is `react-native-paper` + navigation theme in `src/components/Theme.tsx`. When adding UI, prefer `theme.colors.*` over new hard-coded colors.

## Background uploads (important integration)
- Upload queue state is Redux `uploadSlice` + persisted separately in AsyncStorage (`src/utils/uploadsStorage.ts`).
- Background task registration/processing:
  - Task definition: `src/tasks/upload.ts` (registered by `import './src/tasks'` in `App.tsx`).
  - Foreground queue processing: `src/hooks/useUpload.ts`.
  - Background worker: `src/tasks/uploadWorker.ts`.
  - Blob provider: `@vercel/blob/client` with API `handleUploadUrl` (`src/hooks/useAPI.ts`, `src/tasks/uploadWorker.ts`).

## Developer workflows
- Dev server: `npm start` (or `npm run reset` to clear Metro cache).
- Typecheck: `npm run -s check` • Lint: `npm run -s lint` • Tests: `npm test`.
- Storybook: set `app.json` → `expo.extra.storybook=true` (only renders in dev; see `App.tsx`).
