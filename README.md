# Expo Starter

A lean, production-ready Expo starter with file-based routing, Redux, theming, and a curated set of `@rific` packages pre-wired.

## Stack

| Layer | Package |
|---|---|
| Framework | Expo ~57 / React Native ~0.86 |
| Navigation | expo-router ~57 |
| State | Redux Toolkit + redux-persist |
| UI | react-native-paper ~5 |
| Gestures | react-native-gesture-handler ~2.32 |
| Animations | react-native-reanimated ~4.5 |
| OTA | expo-updates ~57 |
| Language | TypeScript ~6 |

---

## Included @rific Packages

### `@rific/auto-paper`

Adaptive `react-native-paper` theming. Derives a full triadic Material 3 palette from a single seed color and wires it to system / light / dark appearance automatically. Bridged to Redux in [`Theme.tsx`](src/components/Theme.tsx) for persistence.

```ts
import { Provider, useThemeSettings } from '@rific/auto-paper';

<Provider initialValue={settings} onChange={onChange}>
  {children}
</Provider>
```

---

### `@rific/scroll-view`

Blur-chrome scroll system. Drop-in replacements for `ScrollView`, `FlatList`, and `SectionList` with floating headers/footers, pull-to-search, keyboard awareness, and horizontal paging. Bridged to Redux in [`Providers.tsx`](src/components/Providers.tsx).

```ts
import { FlatList, ScrollViewHeader, ScrollViewProvider } from '@rific/scroll-view';

<ScrollViewProvider>
  <ScrollViewHeader title="My Screen" />
  <FlatList data={items} renderItem={renderItem} keyExtractor={keyExtractor} />
</ScrollViewProvider>
```

---

### `@rific/haptic-press`

Haptic feedback wrappers for `react-native-paper` and built-in pressable components. Drop-in replacements that fire `expo-haptics` on press.

```ts
import { Button } from '@rific/haptic-press';

<Button mode="contained" onPress={handlePress}>Submit</Button>
```

---

### `@rific/toaster`

Stacking, animated toast notifications with a history stack and swipe-to-dismiss. Includes a provider and a `useToast` hook.

```ts
import { Toaster, ToastProvider, useToast } from '@rific/toaster';

// Wrap your app
<ToastProvider>
  {children}
  <Toaster />
</ToastProvider>

// Trigger anywhere
const { success } = useToast();
success('Saved!');
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
  app/            # expo-router file-based routes
    demos/        # example screens for each included @rific package
    packages/     # example screens for each optional @rific package
  components/     # shared UI components (Providers, Theme)
  constants/      # app-wide constants
  redux/          # store, slices, persistor
  types/          # shared TypeScript types
  utils/          # utility functions
  __tests__/      # Jest test suite
```

---

## Configuration

- **EAS project ID** — set `extra.eas.projectId` in [app.json](app.json)
- **Bundle identifiers** — `ios.bundleIdentifier` and `android.package` in [app.json](app.json)
- **Theme seed color** — defaults to `#6750a4`; override by swapping `themeReducer` for `createThemeReducer({ color: '...' })` from `@rific/auto-paper` in [redux/store.ts](src/redux/store.ts)
