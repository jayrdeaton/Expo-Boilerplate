import { getTriadicPalette, themeActions } from '@rific/auto-paper'
import { Stack } from 'expo-router'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Chip, Divider, Surface, Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/redux/store'

const SEED_COLORS = [
  { label: 'Emerald', value: '#4caf50' },
  { label: 'Indigo', value: '#3f51b5' },
  { label: 'Amber', value: '#ff9800' },
  { label: 'Rose', value: '#e91e63' },
  { label: 'Teal', value: '#009688' },
  { label: 'Violet', value: '#9c27b0' }
]

const APPEARANCES = [
  { label: 'System', value: 'system' as const },
  { label: 'Light', value: 'light' as const },
  { label: 'Dark', value: 'dark' as const }
]

const AutoPaperDemo = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { appearance, color } = useSelector((state: RootState) => state.theme)
  const palette = getTriadicPalette(color)

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
      <Stack.Screen options={{ title: '@rific/auto-paper' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant='headlineSmall'>Auto Paper</Text>
        <Text variant='bodyMedium' style={[styles.desc, { color: theme.colors.onSurfaceVariant }]}>
          Derives a full Material 3 triadic palette from a single seed color and wires it to system, light, or dark appearance automatically. Theme changes propagate instantly across the entire app.
        </Text>

        <Divider style={styles.divider} />
        <Text variant='titleMedium' style={styles.sectionLabel}>
          Seed Color
        </Text>
        <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
          Tap a swatch — the whole app re-themes live.
        </Text>
        <View style={styles.swatches}>
          {SEED_COLORS.map((c) => (
            <TouchableOpacity key={c.value} onPress={() => dispatch(themeActions.setColor(c.value))} style={[styles.swatch, { backgroundColor: c.value }, color === c.value && styles.swatchSelected]} />
          ))}
        </View>

        <Divider style={styles.divider} />
        <Text variant='titleMedium' style={styles.sectionLabel}>
          Appearance
        </Text>
        <View style={styles.chips}>
          {APPEARANCES.map((a) => (
            <Chip key={a.value} selected={appearance === a.value} onPress={() => dispatch(themeActions.setAppearance(a.value))} style={styles.chip}>
              {a.label}
            </Chip>
          ))}
        </View>

        <Divider style={styles.divider} />
        <Text variant='titleMedium' style={styles.sectionLabel}>
          Derived Triadic Palette
        </Text>
        <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
          Primary, secondary, and tertiary are evenly spaced on the color wheel from the seed.
        </Text>
        <View style={styles.palette}>
          {[
            { label: 'Primary', value: palette.primary },
            { label: 'Secondary', value: palette.secondary },
            { label: 'Tertiary', value: palette.tertiary }
          ].map((p) => (
            <Surface key={p.label} style={[styles.paletteChip, { backgroundColor: p.value }]} elevation={2}>
              <Text variant='labelSmall' style={styles.paletteLabel}>
                {p.label}
              </Text>
              <Text variant='labelSmall' style={styles.paletteHex}>
                {p.value}
              </Text>
            </Surface>
          ))}
        </View>

        <Divider style={styles.divider} />
        <Text variant='titleMedium' style={styles.sectionLabel}>
          Live Theme Colors
        </Text>
        {[
          { label: 'primary', value: theme.colors.primary },
          { label: 'secondary', value: theme.colors.secondary },
          { label: 'tertiary', value: theme.colors.tertiary },
          { label: 'background', value: theme.colors.background },
          { label: 'surface', value: theme.colors.surface },
          { label: 'error', value: theme.colors.error }
        ].map((tc) => (
          <View key={tc.label} style={styles.colorRow}>
            <View style={[styles.colorDot, { backgroundColor: tc.value }]} />
            <Text variant='bodySmall' style={[styles.fill, { color: theme.colors.onSurfaceVariant }]}>
              {tc.label}
            </Text>
            <Text variant='bodySmall' style={{ color: theme.colors.onSurfaceVariant }}>
              {tc.value}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  chip: {},
  chips: { flexDirection: 'row', gap: 8 },
  colorDot: { borderRadius: 12, height: 24, width: 24 },
  colorRow: { alignItems: 'center', flexDirection: 'row', gap: 12, paddingVertical: 8 },
  container: { padding: 16, paddingBottom: 32 },
  desc: { marginTop: 8 },
  divider: { marginVertical: 20 },
  fill: { flex: 1 },
  hint: { marginBottom: 12 },
  palette: { flexDirection: 'row', gap: 8 },
  paletteChip: { alignItems: 'center', borderRadius: 10, flex: 1, padding: 12 },
  paletteHex: { color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  paletteLabel: { color: 'white', fontWeight: '700' },
  sectionLabel: { marginBottom: 8 },
  swatch: { borderRadius: 24, height: 48, width: 48 },
  swatchSelected: { borderColor: 'white', borderWidth: 3 },
  swatches: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 }
})

export default AutoPaperDemo
