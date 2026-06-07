# Expo Starter

A lean, production-ready Expo starter with file-based routing, Redux, theming, and a curated set of `@rific` packages pre-wired.

## Stack

| Layer | Package |
|---|---|
| Framework | Expo ~56 / React Native ~0.85 |
| Navigation | expo-router ~56 |
| State | Redux Toolkit + redux-persist |
| UI | react-native-paper ~5 |
| Gestures | react-native-gesture-handler ~2.31 |
| Animations | react-native-reanimated ~4 |
| OTA | expo-updates ~56 |
| Language | TypeScript ~6 |

---

## Included @rific Packages

### `@rific/auto-paper`

Adaptive `react-native-paper` theming. Derives a full triadic Material 3 palette from a single seed color and wires it to system / light / dark appearance automatically.

```ts
import { AutoPaperProvider } from '@rific/auto-paper';

<AutoPaperProvider seedColor="#6750A4">
  {children}
</AutoPaperProvider>
```

---

### `@rific/haptic-press`

Haptic feedback wrappers for `react-native-paper` and built-in pressable components. Drop-in replacements that fire `expo-haptics` on press.

```ts
import { HapticButton, HapticPressable } from '@rific/haptic-press';

<HapticButton mode="contained" onPress={handlePress}>Submit</HapticButton>
```

---

### `@rific/toaster`

Stacking, animated toast notifications with a history stack and swipe-to-dismiss. Includes a provider and a `useToast` hook.

```ts
import { ToasterProvider, useToast } from '@rific/toaster';

// Wrap your app
<ToasterProvider />

// Trigger anywhere
const { show } = useToast();
show({ message: 'Saved!', type: 'success' });
```

---

### `@rific/updater`

OTA update hook for Expo apps. Silently fetches updates in the background on foreground, with an optional manual check that shows a confirmation dialog before reloading.

```ts
import { useUpdater } from '@rific/updater';

// In your root layout — background polling is automatic
useUpdater();
```

---

## Optional @rific Packages

These are not included by default but are built to work seamlessly with this stack.

| Package | Description |
|---|---|
| `@rific/focus-chain` | Auto-incrementing focus chain hook for form inputs — wire a `returnKeyType="next"` sequence with one hook call |
| `@rific/heatmap` | GitHub-style activity heatmap with SVG rendering and customizable cell modes |
| `@rific/resizable-input` | Auto-growing, drag-resizable text input with optional `react-native-paper` support |
| `@rific/scanner` | Full-screen barcode scanner with animated overlays, pinch zoom, timeout ring, and scan tracking |
| `@rific/timer` | Animated SVG progress ring timer |

---

## Getting Started

```bash
npm install
npm run start        # Expo Go
npm run client       # dev client
npm run reset        # clear cache + start
```

### Prebuild

```bash
npm run prebuild     # expo prebuild --clean
npm run ios          # run on iOS simulator
npm run android      # run on Android emulator
```

### Validation

```bash
npm run validate     # lint + typecheck + test
npm run lint
npm run typecheck
npm run test
```

### EAS

```bash
npm run build:production
npm run build:staging
npm run update           # eas update
npm run update:bump      # bump OTA version + push
```

---

## Project Structure

```
src/
  app/          # expo-router file-based routes
  components/   # shared UI components
  constants/    # app-wide constants
  redux/        # store, slices, persistor
  types/        # shared TypeScript types
  utils/        # utility functions
  __tests__/    # Jest test suite
```

---

## Configuration

- **EAS project ID** — set `extra.eas.projectId` in [app.json](app.json)
- **Bundle identifiers** — `ios.bundleIdentifier` and `android.package` in [app.json](app.json)
- **Theme seed color** — passed to `AutoPaperProvider` in your root layout
