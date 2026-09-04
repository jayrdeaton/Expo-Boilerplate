// Resolved true by default so components that gate on an icon font (see Theme.tsx's own
// useFonts(MaterialCommunityIcons.font)) don't need per-test setup just to render past it.
// isLoaded/loadAsync are also needed here (not just useFonts): @expo/vector-icons/MaterialCommunityIcons
// (the exact subpath react-native-paper's own Icon renderer imports, distinct from the
// '@expo/vector-icons' barrel mocked separately) calls Font.isLoaded/Font.loadAsync directly in its
// own component lifecycle, real font asset resolution and all, any time an actual icon renders.
module.exports = {
  isLoaded: () => true,
  loadAsync: () => Promise.resolve(),
  useFonts: () => [true, null]
}
