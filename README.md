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

Adaptive `react-native-paper` theming. Derives a full triadic Material 3 palette from a single seed color and wires it to system / light / dark appearance automatically. Also carries fixed `success`/`warning`/`danger` semantic color roles (each with `on*`/`*Container` variants) alongside MD3's built-in `error`, and a typed `useAutoPaperTheme()` hook for reading them with full autocomplete. Bridged to Redux in [`Theme.tsx`](src/components/Theme.tsx) for persistence.

```ts
import { Provider, useAutoPaperTheme, useThemeSettings } from '@rific/auto-paper';

<Provider initialValue={settings} onChange={onChange}>
  {children}
</Provider>

const { colors } = useAutoPaperTheme();
<Text style={{ color: colors.warning }}>Check your connection</Text>
```

---

### `@rific/drawer`

Sliding drawer/sheet, spring-animated and theme-aware. Slides in from any of the four edges: `left`/`right` for a nav/settings drawer, `top`/`bottom` for a bottom sheet, same mechanism either way, so one package covers both use cases (this is what makes a standalone bottom-sheet dependency unnecessary in this stack). One `createDrawer()` call per instance; `combineDrawerProviders` flattens nesting multiple drawers into a single wrapper. See [`demos/drawer.tsx`](src/app/demos/drawer.tsx) for a left nav drawer, a right settings drawer, and a bottom sheet side by side.

```ts
import { combineDrawerProviders, createDrawer } from '@rific/drawer';

const nav = createDrawer({ side: 'left', width: 300 });
const sheet = createDrawer({ side: 'bottom', contentSize: true }); // sizes to its content instead of a fixed height

const AllDrawersProvider = combineDrawerProviders(
  [nav.DrawerProvider, { content: <NavDrawerContent /> }],
  [sheet.DrawerProvider, { content: <SheetContent /> }]
);

// anywhere else:
const { open } = sheet.useDrawer();
```

Each panel comes with a swipe-to-dismiss drag handle, an edge-swipe-to-open gesture, and an optional blurred surface via `@rific/auto-paper`'s `BlurView`, no extra wiring needed for any of it.

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

Haptic feedback wrappers for `react-native-paper` and built-in pressable components. Drop-in replacements that fire `expo-haptics` on press, now covering `Button`, `IconButton`, `TouchableRipple`, `Card`, `Chip`, `AppbarBackAction`, `AppbarAction`, `FAB`, `Checkbox`, `Switch`, `SegmentedButtons`, plus the native `Pressable`/`TouchableOpacity`/`TouchableHighlight`.

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

// In your root layout, background polling is automatic
useUpdater();
```

---

### `@rific/focus-chain`

Auto-advancing focus chain for form inputs. Call the hook once, spread the result onto each input in order, and pressing Next or Return moves focus to the next field automatically, no manual ref wiring.

```ts
import { useFocusChain } from '@rific/focus-chain';

const register = useFocusChain();
const first = register();
const second = register();

<TextInput {...first} returnKeyType="next" />
<TextInput {...second} returnKeyType="done" onSubmitEditing={handleSubmit} />
```

---

### `@rific/splash-gate`

Names every async condition this app's first screen depends on and holds the splash screen up until all of them report ready, instead of hiding it the moment the first one resolves and letting anything else (an icon font, a hydrated preference) pop in a beat later. Wired into [`Theme.tsx`](src/components/Theme.tsx): `theme` (auto-paper's own Provider `onReady`) and `fonts` (the icon font every react-native-paper icon in this app depends on, preloaded via `expo-font`'s `useFonts`). See [`demos/splash-gate.tsx`](src/app/demos/splash-gate.tsx) for an isolated, replayable simulation of the mechanism. The real splash screen can only ever show once, at cold launch, so it can't be demoed directly from a screen you navigate to.

```ts
import { createSplashGate } from '@rific/splash-gate';

// splashGate.ts, created once, at module scope
export const { markReady, useReady, pendingGates } = createSplashGate(['theme', 'fonts'] as const);

// Theme.tsx
const [fontsLoaded] = useFonts({ ... });
useReady('fonts', fontsLoaded);
const onThemeReady = () => markReady('theme'); // a one-shot callback, not a boolean, call directly
```

---

## Optional @rific Packages

These are not included by default but are built to work seamlessly with this stack.

| Package | Description |
|---|---|
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

- **EAS project ID**: set `extra.eas.projectId` in [app.json](app.json)
- **Bundle identifiers**: `ios.bundleIdentifier` and `android.package` in [app.json](app.json)
- **Theme seed color**: defaults to `#6750a4`; override by swapping `themeReducer` for `createThemeReducer({ color: '...' })` from `@rific/auto-paper` in [redux/store.ts](src/redux/store.ts)
