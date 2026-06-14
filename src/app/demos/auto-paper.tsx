import { AppearancePicker, ColorPicker, Dialog, HarmonyPicker, Menu, useThemeSettings } from '@rific/auto-paper'
import { ScrollView, ScrollViewHeader, ScrollViewProvider } from '@rific/scroll-view'
import { Stack, useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Dialog as PaperDialog, Divider, Menu as PaperMenu, Surface, Switch, Text, useTheme } from 'react-native-paper'

const AutoPaperDemo = () => {
  const router = useRouter()
  const theme = useTheme()
  const {
    settings: { appearance, blur, color, harmony },
    set
  } = useThemeSettings()

  const [dialogVisible, setDialogVisible] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <View style={[styles.fill, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollViewProvider>
        <ScrollViewHeader backAction={() => router.back()} title='Auto Paper' caption='@rific/auto-paper' />
        <ScrollView contentContainerStyle={styles.container}>
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
          <ColorPicker value={color} onChange={(c) => set({ color: c })} />

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Appearance
          </Text>
          <AppearancePicker value={appearance} onChange={(a) => set({ appearance: a })} />

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Color Harmony
          </Text>
          <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            Controls how secondary and tertiary colors are derived from the seed.
          </Text>
          <HarmonyPicker value={harmony} onChange={(h) => set({ harmony: h })} />

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Blur Mode
          </Text>
          <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            Dialog and Menu components support a blur backdrop. Toggle to compare.
          </Text>
          <View style={styles.blurRow}>
            <Text variant='bodyMedium'>Blur enabled</Text>
            <Switch value={blur} onValueChange={(v) => set({ blur: v })} />
          </View>
          <View style={styles.blurButtons}>
            <Button mode='outlined' onPress={() => setDialogVisible(true)}>
              Open Dialog
            </Button>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button mode='outlined' onPress={() => setMenuVisible(true)}>
                  Open Menu
                </Button>
              }
            >
              <PaperMenu.Item onPress={() => setMenuVisible(false)} title='Option A' />
              <PaperMenu.Item onPress={() => setMenuVisible(false)} title='Option B' />
              <PaperMenu.Item onPress={() => setMenuVisible(false)} title='Option C' />
            </Menu>
          </View>
          <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
            <PaperDialog.Title>{`Blur ${blur ? 'On' : 'Off'}`}</PaperDialog.Title>
            <PaperDialog.Content>
              <Text variant='bodyMedium'>{`This dialog is rendered ${blur ? 'with' : 'without'} the blur backdrop.`}</Text>
            </PaperDialog.Content>
            <PaperDialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>Close</Button>
            </PaperDialog.Actions>
          </Dialog>

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Derived Palette
          </Text>
          <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            Primary, secondary, and tertiary derived from the seed using the selected harmony.
          </Text>
          <View style={styles.palette}>
            {[
              { label: 'Primary', bg: theme.colors.primary, on: theme.colors.onPrimary },
              { label: 'Secondary', bg: theme.colors.secondary, on: theme.colors.onSecondary },
              { label: 'Tertiary', bg: theme.colors.tertiary, on: theme.colors.onTertiary }
            ].map((p) => (
              <Surface key={p.label} style={[styles.paletteChip, { backgroundColor: p.bg }]} elevation={2}>
                <Text variant='labelSmall' style={[styles.paletteLabel, { color: p.on }]}>
                  {p.label}
                </Text>
                <Text variant='labelSmall' style={[styles.paletteHex, { color: p.on + 'B3' }]}>
                  {p.bg}
                </Text>
              </Surface>
            ))}
          </View>
          <View style={[styles.palette, styles.paletteRow]}>
            {[
              { label: 'Primary', sublabel: 'Container', bg: theme.colors.primaryContainer, on: theme.colors.onPrimaryContainer },
              { label: 'Secondary', sublabel: 'Container', bg: theme.colors.secondaryContainer, on: theme.colors.onSecondaryContainer },
              { label: 'Tertiary', sublabel: 'Container', bg: theme.colors.tertiaryContainer, on: theme.colors.onTertiaryContainer }
            ].map((p) => (
              <Surface key={p.label} style={[styles.paletteChip, { backgroundColor: p.bg }]} elevation={2}>
                <Text variant='labelSmall' style={[styles.paletteLabel, { color: p.on }]}>
                  {p.label}
                </Text>
                <Text variant='labelSmall' style={[styles.paletteSublabel, { color: p.on }]}>
                  {p.sublabel}
                </Text>
                <Text variant='labelSmall' style={[styles.paletteHex, { color: p.on + 'B3' }]}>
                  {p.bg}
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
            { label: 'onPrimary', value: theme.colors.onPrimary },
            { label: 'primaryContainer', value: theme.colors.primaryContainer },
            { label: 'onPrimaryContainer', value: theme.colors.onPrimaryContainer },
            { label: 'secondary', value: theme.colors.secondary },
            { label: 'onSecondary', value: theme.colors.onSecondary },
            { label: 'secondaryContainer', value: theme.colors.secondaryContainer },
            { label: 'onSecondaryContainer', value: theme.colors.onSecondaryContainer },
            { label: 'tertiary', value: theme.colors.tertiary },
            { label: 'onTertiary', value: theme.colors.onTertiary },
            { label: 'tertiaryContainer', value: theme.colors.tertiaryContainer },
            { label: 'onTertiaryContainer', value: theme.colors.onTertiaryContainer },
            { label: 'error', value: theme.colors.error },
            { label: 'onError', value: theme.colors.onError },
            { label: 'errorContainer', value: theme.colors.errorContainer },
            { label: 'onErrorContainer', value: theme.colors.onErrorContainer },
            { label: 'background', value: theme.colors.background },
            { label: 'onBackground', value: theme.colors.onBackground },
            { label: 'surface', value: theme.colors.surface },
            { label: 'onSurface', value: theme.colors.onSurface },
            { label: 'surfaceVariant', value: theme.colors.surfaceVariant },
            { label: 'onSurfaceVariant', value: theme.colors.onSurfaceVariant },
            { label: 'surfaceDisabled', value: theme.colors.surfaceDisabled },
            { label: 'onSurfaceDisabled', value: theme.colors.onSurfaceDisabled },
            { label: 'inverseSurface', value: theme.colors.inverseSurface },
            { label: 'inverseOnSurface', value: theme.colors.inverseOnSurface },
            { label: 'inversePrimary', value: theme.colors.inversePrimary },
            { label: 'outline', value: theme.colors.outline },
            { label: 'outlineVariant', value: theme.colors.outlineVariant },
            { label: 'shadow', value: theme.colors.shadow },
            { label: 'scrim', value: theme.colors.scrim },
            { label: 'backdrop', value: theme.colors.backdrop }
          ].map(({ label, value: hex }) => (
            <View key={label} style={styles.colorRow}>
              <View style={[styles.colorDot, { backgroundColor: hex }]} />
              <Text variant='bodySmall' style={[styles.fill, { color: theme.colors.onSurfaceVariant }]}>
                {label}
              </Text>
              <Text variant='bodySmall' style={{ color: theme.colors.onSurfaceVariant }}>
                {hex}
              </Text>
            </View>
          ))}
        </ScrollView>
      </ScrollViewProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  blurButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  blurRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  colorDot: { borderRadius: 12, height: 24, width: 24 },
  colorRow: { alignItems: 'center', flexDirection: 'row', gap: 12, paddingVertical: 8 },
  container: { paddingHorizontal: 16, paddingTop: 16 },
  desc: { marginTop: 0 },
  divider: { marginVertical: 20 },
  fill: { flex: 1 },
  hint: { marginBottom: 12 },
  palette: { flexDirection: 'row', gap: 8 },
  paletteChip: { alignItems: 'center', borderRadius: 10, flex: 1, padding: 12 },
  paletteHex: { marginTop: 4 },
  paletteLabel: { fontWeight: '700' },
  paletteRow: { marginTop: 8 },
  paletteSublabel: { opacity: 0.6 },
  sectionLabel: { marginBottom: 8 }
})

export default AutoPaperDemo
