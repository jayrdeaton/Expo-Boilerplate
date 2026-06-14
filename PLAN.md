# @rific/scroll-view

A React Native scroll system for blur-chrome app shells — floating headers and footers with blur-through visuals, scroll-away or lockable behavior, and keyboard awareness. Composes with `@rific/auto-paper`.

## Package Details

- npm: `@rific/scroll-view`
- Repo: `React-Native-Scroll-View`
- Source of truth: CashierFu-Utility scroll view system

## Peer Dependencies

| Package                          | Required                               |
| -------------------------------- | -------------------------------------- |
| react >=18.0.0                   | yes                                    |
| react-native >=0.73.0            | yes                                    |
| react-native-reanimated >=3.0.0  | yes                                    |
| react-native-keyboard-controller | yes                                    |
| react-native-gesture-handler     | yes                                    |
| react-native-safe-area-context   | yes                                    |
| @rific/auto-paper                | yes (BlurView)                         |
| @shopify/flash-list              | optional (FlashList only)              |

## Exports

### Components
- `ScrollViewProvider` — wraps a screen, owns all scroll state; accepts `headerLock`, `footerLock`, `blur`
- `ScrollView` — keyboard-aware scroll container; applies header/footer insets, handles FAB and gestures
- `FlatList` — same feature set as `ScrollView`, backed by RN `FlatList`
- `FlashList` — same feature set as `ScrollView`, backed by `@shopify/flash-list` (optional peer)
- `ScrollViewHeader` — absolutely-positioned blur header shell; accepts any children
- `ScrollViewFooter` — absolutely-positioned blur footer shell; accepts any children

### Hooks
- `useScrollView` — exposes `scrollPosition`, `progress`, `setProgress`, `setProgressing`, `scrollHeight`

## API

### ScrollViewProvider
```tsx
<ScrollViewProvider
  headerLock={boolean}   // lock header in place (default false)
  footerLock={boolean}   // lock footer in place (default false)
  blur={boolean}         // enable blur chrome (default true)
>
```
Owns: `headerHeight`, `footerHeight`, `scrollPosition` (SharedValue), `progress`, `progressing`.

### ScrollView / FlatList / FlashList

All three share the same prop surface and behavior:

```tsx
<ScrollView
  headerLock?: boolean      // per-screen override of provider
  footerLock?: boolean      // per-screen override of provider
  gesture?: GestureType     // gesture-handler composition
  onRefresh?: () => void
  refreshing?: boolean
  {...ScrollViewProps}       // (or FlatListProps / FlashListProps)
/>
```
- `ScrollView` uses `KeyboardAwareScrollView` internally
- `FlatList` uses `KeyboardAwareFlatList` (or `renderScrollComponent` on RN `FlatList`)
- `FlashList` has no `ScrollViewComponent`/`renderScrollComponent` prop — keyboard offset is applied manually via `useKeyboardController` hook + reactive `contentInset` updates; `onScroll` bridges to the shared scroll position
- All apply `contentInset`/`contentOffset` from measured header/footer heights
- All show FAB scroll-to-top after scrolling 100px; animated in/out

### ScrollViewHeader / ScrollViewFooter
```tsx
<ScrollViewHeader topInset?: boolean style?: ViewStyle>
  {/* any children — Appbar.Header, custom row, etc. */}
</ScrollViewHeader>
```
- Absolutely positioned over content
- Blur-backed via `BlurView` from `@rific/auto-paper`
- Translates out of view on scroll, snaps back on reverse; locked when `headerLock`/`footerLock` is true
- Includes indeterminate/determinate `ProgressBar` driven by `useScrollView`

## Changes from CashierFu-Utility Source

| Before (CashierFu-Utility) | After (@rific/scroll-view) |
|---|---|
| `headerLock`/`footerLock`/`blur` from `useSettings()` | Props on `ScrollViewProvider` |
| `BlurView` local component | `BlurView` imported from `@rific/auto-paper` |
| `FAB` and `RefreshControl` local deps | Internalized in package |
| `TAB_BAR_HEIGHT = 60` hardcoded | `tabBarHeight` prop on `ScrollViewProvider` (default 60) |
| Progress set via context directly | `setProgress`/`setProgressing` via `useScrollView` |
| `InsetScrollView` / `InsetFlashList` utilities | Full `ScrollView`, `FlatList`, `FlashList` with parity |

## Build Steps

1. Scaffold from `React-Native-Haptic-Press` (tsup, jest, eslint config)
2. Port and adapt `ScrollViewProvider`
3. Port and adapt `ScrollView` (keyboard controller, gesture, FAB, refresh)
4. Port and adapt `ScrollViewHeader` + `ScrollViewFooter`
5. Build `FlatList` wrapper with full feature parity to `ScrollView`
6. Build `FlashList` wrapper with full feature parity to `ScrollView`
7. Tests: provider context, lock behavior, inset calculations, scroll handler; cover all three list types
8. Build, verify types, check peer dep surface
9. Publish `@rific/scroll-view`

## Open Questions

- FAB: always-on (current) or opt-in via `showFab?: boolean`?
- `FlashList`: always exported (consumer must have @shopify/flash-list) or behind a separate entry point?
- Should the package re-export `BlurView` from `@rific/auto-paper` as a convenience?
- `tabBarHeight`: on `ScrollViewProvider` or individual list props (or both)?

---

# Rific-Demos Repo

A standalone Expo app that demos every `@rific` package with full interactive examples — separate from Expo-Starter so the starter stays lean.

## Motivation

- Expo-Starter's home screen surfaces optional packages but only links to info pages, not live demos
- A dedicated demos repo has no cleanup overhead per new project — it can install everything
- Serves as a reference when integrating packages into real projects

## Scope

Install and demo every `@rific` package:
- `auto-paper` — seed color picker, theme switching
- `haptic-press` — all button/FAB variants with haptic feedback
- `toaster` — all toast types, stacking, history
- `focus-chain` — multi-field form with auto-advance
- `resizable-input` — auto-grow and drag-resize
- `heatmap` — activity data rendering
- `scanner` — full-screen barcode scanner flow
- `timer` — SVG progress ring in action
- `scroll-view` — blur chrome header/footer, lock modes (once built)

## Structure

- Clone from Expo-Starter as the base
- One tab or route per package
- No Redux needed (or minimal — just for auto-paper theme state)
- Linked from optional package info screens in Expo-Starter (or standalone)

## Open Questions

- Repo name: `Rific-Demos` or `React-Native-Rific-Demos`?
- Should it live as a public showcase or stay private as a dev reference?
