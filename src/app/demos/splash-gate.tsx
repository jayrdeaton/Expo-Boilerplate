import { Button } from '@rific/feedback-press'
import { ScrollView, ScrollViewHeader, ScrollViewProvider } from '@rific/scroll-view'
import { createSplashGate } from '@rific/splash-gate'
import { Stack, useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Chip, Divider, Icon, Surface, Text, useTheme } from 'react-native-paper'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

// A handful of made-up conditions for this demo's own sandboxed "screen" below, not the real
// app's own gates (see src/utils/splashGate.ts's 'theme'/'fonts', already resolved long before you
// could ever navigate to this screen). The real native splash screen can only ever be shown once,
// at the very start of a cold launch, so there's no way to bring it back on-screen from here to
// demo it directly. This recreates the exact same mechanism, isolated, so it can be replayed.
const DEMO_GATES = ['theme', 'fonts', 'preferences'] as const
type DemoGate = (typeof DEMO_GATES)[number]

const GATE_LABELS: Record<DemoGate, string> = {
  theme: 'Theme',
  fonts: 'Icon font',
  preferences: 'Saved preferences'
}

const INFO_ITEMS = [
  {
    label: 'createSplashGate(gates)',
    desc: 'Call once, at module scope, with every async condition your first screen depends on. Returns markReady, useReady, and pendingGates, all bound to that one instance.'
  },
  {
    label: 'markReady(gate) / useReady(gate, ready)',
    desc: "Mark a gate ready from wherever it actually resolves: markReady for a one-shot callback (a library's own onReady prop), useReady for a plain boolean (state from a hook)."
  },
  {
    label: 'One hide, once',
    desc: 'The splash screen hides exactly once, the moment every named gate has reported ready, in whatever order they actually resolve. An empty gate list hides immediately rather than hanging.'
  }
]

const SplashGateDemo = () => {
  const router = useRouter()
  const theme = useTheme()
  const [gate, setGate] = useState(() => createSplashGate(DEMO_GATES))
  const [readyGates, setReadyGates] = useState<Set<DemoGate>>(new Set())
  const allReady = readyGates.size === DEMO_GATES.length

  const markReady = (name: DemoGate) => {
    if (readyGates.has(name)) return
    gate.markReady(name)
    setReadyGates((prev) => new Set(prev).add(name))
  }

  const reset = () => {
    setGate(createSplashGate(DEMO_GATES))
    setReadyGates(new Set())
  }

  return (
    <View style={[styles.fill, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollViewProvider>
        <ScrollViewHeader backAction={() => router.back()} title='Splash Gate' caption='@rific/splash-gate' />
        <ScrollView contentContainerStyle={styles.container}>
          <Text variant='bodyMedium' style={[styles.desc, { color: theme.colors.onSurfaceVariant }]}>
            Names every async condition your app&apos;s first screen depends on and holds the splash screen up until all of them report ready, instead of hiding it the moment the first one resolves and letting anything else (an icon font, a hydrated preference) pop in a beat later. Wired into this starter&apos;s own launch in <Text style={styles.code}>Theme.tsx</Text>, see below.
          </Text>

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Live Simulation
          </Text>
          <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            Mark each condition ready and watch the sandbox below reveal itself the instant all three are in, not one at a time.
          </Text>

          <Surface style={[styles.sandbox, { backgroundColor: theme.colors.surfaceVariant }]} elevation={1}>
            <View style={styles.sandboxContent}>
              <Icon source='check-decagram' size={28} color={theme.colors.primary} />
              <Text variant='titleMedium' style={styles.sandboxTitle}>
                Home Screen
              </Text>
              <Text variant='bodySmall' style={{ color: theme.colors.onSurfaceVariant }}>
                Everything below was already correct the moment you could see it.
              </Text>
            </View>
            {!allReady && (
              <Animated.View exiting={FadeOut.duration(400)} style={[styles.sandboxOverlay, { backgroundColor: theme.colors.surface }]}>
                <ActivityIndicator size='small' />
                <Text variant='labelMedium' style={styles.sandboxOverlayLabel}>
                  Splash screen (simulated)
                </Text>
              </Animated.View>
            )}
          </Surface>

          <View style={styles.row}>
            {DEMO_GATES.map((name) => {
              const ready = readyGates.has(name)
              return (
                <Chip key={name} icon={ready ? 'check' : 'timer-sand'} selected={ready} disabled={ready} onPress={() => markReady(name)}>
                  {GATE_LABELS[name]}
                </Chip>
              )
            })}
          </View>
          {allReady ? (
            <Animated.View entering={FadeIn}>
              <Button mode='outlined' onPress={reset} style={styles.resetButton}>
                Reset
              </Button>
            </Animated.View>
          ) : null}

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            How It Works
          </Text>
          <Surface style={[styles.infoCard, { backgroundColor: theme.colors.surfaceVariant }]} elevation={0}>
            {INFO_ITEMS.map((item, i) => (
              <View key={item.label} style={[styles.infoItem, i === 0 && styles.infoItemFirst]}>
                <Text variant='labelMedium' style={styles.code}>
                  {item.label}
                </Text>
                <Text variant='bodySmall' style={[styles.infoItemDesc, { color: theme.colors.onSurfaceVariant }]}>
                  {item.desc}
                </Text>
              </View>
            ))}
          </Surface>

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            In This App
          </Text>
          <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            <Text style={styles.code}>src/utils/splashGate.ts</Text> declares this app&apos;s real gates, currently <Text style={styles.code}>theme</Text> and <Text style={styles.code}>fonts</Text>. <Text style={styles.code}>Theme.tsx</Text> marks <Text style={styles.code}>theme</Text> ready once auto-paper&apos;s Provider reports in, and <Text style={styles.code}>fonts</Text> ready once the icon font every react-native-paper icon in this app depends on finishes loading. Add a new gate any time a future screen picks up another async dependency of its own.
          </Text>
        </ScrollView>
      </ScrollViewProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  code: { fontFamily: 'monospace' },
  container: { paddingHorizontal: 16, paddingTop: 16 },
  desc: { marginTop: 0 },
  divider: { marginVertical: 20 },
  fill: { flex: 1 },
  hint: { marginBottom: 12 },
  infoCard: { borderRadius: 12 },
  infoItem: {
    borderTopColor: 'rgba(128,128,128,0.2)',
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 16
  },
  infoItemDesc: { marginTop: 4 },
  infoItemFirst: { borderTopWidth: 0 },
  resetButton: { alignSelf: 'flex-start', marginTop: 12 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  sandbox: { borderRadius: 12, height: 160, marginBottom: 4, overflow: 'hidden' },
  sandboxContent: { alignItems: 'center', flex: 1, gap: 4, justifyContent: 'center', padding: 16 },
  sandboxOverlay: { alignItems: 'center', bottom: 0, gap: 8, justifyContent: 'center', left: 0, position: 'absolute', right: 0, top: 0 },
  sandboxOverlayLabel: { opacity: 0.7 },
  sandboxTitle: { marginTop: 4 },
  sectionLabel: { marginBottom: 8 }
})

export default SplashGateDemo
