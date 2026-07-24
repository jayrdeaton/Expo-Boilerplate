import { combineDrawerProviders, createDrawer } from '@rific/drawer'
import { Button } from '@rific/haptic-press'
import { ScrollView, ScrollViewHeader, ScrollViewProvider } from '@rific/scroll-view'
import { Stack, useRouter } from 'expo-router'
import { useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Divider, IconButton, List, Surface, Switch, Text, useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const nav = createDrawer({ side: 'left', width: 280 })
const settings = createDrawer({ side: 'right', width: 300 })

// The panel itself renders edge-to-edge on purpose (see @rific/drawer's README) — insetting for
// the notch/home indicator is this content's own call, same as any other screen would make.
const NavDrawerContent = () => {
  const { close } = nav.useDrawer()
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.drawerContent, { backgroundColor: theme.colors.surface, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.drawerHeader}>
        <Text variant='titleMedium'>Navigate</Text>
        <IconButton icon='close' onPress={close} accessibilityLabel='Close' />
      </View>
      <List.Item title='Home' left={(props) => <List.Icon {...props} icon='home-outline' />} onPress={close} />
      <List.Item title='Explore' left={(props) => <List.Icon {...props} icon='compass-outline' />} onPress={close} />
      <List.Item title='Favorites' left={(props) => <List.Icon {...props} icon='heart-outline' />} onPress={close} />
    </View>
  )
}

const SettingsDrawerContent = () => {
  const { close } = settings.useDrawer()
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <View style={[styles.drawerContent, { backgroundColor: theme.colors.surface, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.drawerHeader}>
        <Text variant='titleMedium'>Settings</Text>
        <IconButton icon='close' onPress={close} accessibilityLabel='Close' />
      </View>
      <List.Item title='Dark mode' right={() => <Switch value={darkMode} onValueChange={setDarkMode} />} />
      <List.Item title='Notifications' right={() => <Switch value={notifications} onValueChange={setNotifications} />} />
    </View>
  )
}

const AllDrawersProvider = combineDrawerProviders([nav.DrawerProvider, { content: <NavDrawerContent /> }], [settings.DrawerProvider, { content: <SettingsDrawerContent /> }])

const FEATURES = ['Spring-animated sliding panel with a tap-to-dismiss backdrop', 'Opens by calling open(), or by swiping in from the screen edge', 'One createDrawer() call per instance — a left nav drawer and a right settings drawer stay fully independent', 'combineDrawerProviders() flattens nesting multiple drawers into a single wrapper', 'Theme-aware — reads its surface color from react-native-paper', 'enabled prop to temporarily suppress the edge-swipe gesture', 'Panel renders edge-to-edge, deliberately — pad your own content with useSafeAreaInsets() (as this demo does), so it never conflicts with a safe-area-aware header you may already be using']

const PROPS = [
  { name: 'side', type: "'left' | 'right'", desc: "Which edge the drawer anchors to and swipes in from. Default: 'left'." },
  { name: 'width', type: 'number', desc: 'Panel width in pixels. Default: 300.' },
  { name: 'content', type: 'ReactNode', desc: "The DrawerProvider's own prop — what renders inside the sliding panel." },
  { name: 'enabled', type: 'boolean', desc: 'Suppresses the edge-swipe gesture when false, without touching open()/close(). Default: true.' }
]

const USAGE = `import { createDrawer, combineDrawerProviders } from '@rific/drawer'

const nav = createDrawer({ side: 'left', width: 300 })
const settings = createDrawer({ side: 'right', width: 320 })

const AllDrawersProvider = combineDrawerProviders(
  [nav.DrawerProvider, { content: <AppDrawerContent /> }],
  [settings.DrawerProvider, { content: <SettingsDrawerContent /> }]
)

// once, near the app root (inside GestureHandlerRootView):
<AllDrawersProvider>
  <RootNavigator />
</AllDrawersProvider>

// anywhere else:
const { isOpen, open, close } = nav.useDrawer()
<IconButton icon="menu" onPress={open} />`

// Rendered as AllDrawersProvider's child (not its parent) so nav.useDrawer()/settings.useDrawer()
// actually resolve the real Provider values instead of the no-op default context.
const DrawerDemoContent = () => {
  const router = useRouter()
  const theme = useTheme()
  const navDrawer = nav.useDrawer()
  const settingsDrawer = settings.useDrawer()

  return (
    <View style={[styles.fill, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />
      <ScrollViewProvider>
        <ScrollViewHeader backAction={() => router.back()} title='@rific/drawer' />
        <ScrollView contentContainerStyle={styles.container}>
          <Text variant='headlineSmall'>Drawer</Text>
          <Text variant='bodyMedium' style={[styles.desc, { color: theme.colors.onSurfaceVariant }]}>
            Left/right sliding drawer with edge-swipe gestures. Not yet published — still being tested here.
          </Text>

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Try it
          </Text>
          <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            Tap a button below, or swipe in from the left or right screen edge.
          </Text>
          <View style={styles.row}>
            <Button mode='contained' icon='menu' onPress={navDrawer.open}>
              Open nav drawer
            </Button>
            <Button mode='contained' icon='cog-outline' onPress={settingsDrawer.open}>
              Open settings drawer
            </Button>
          </View>

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Features
          </Text>
          {FEATURES.map((f) => (
            <View key={f} style={styles.bullet}>
              <Text style={{ color: theme.colors.primary }}>•</Text>
              <Text variant='bodyMedium' style={[styles.fill, { color: theme.colors.onSurfaceVariant }]}>
                {f}
              </Text>
            </View>
          ))}

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Key Props
          </Text>
          <Surface style={[styles.apiCard, { backgroundColor: theme.colors.surfaceVariant }]} elevation={0}>
            {PROPS.map((prop, i) => (
              <View key={prop.name} style={[styles.apiItem, i === 0 && styles.apiItemFirst]}>
                <View style={styles.propRow}>
                  <Text style={[styles.code, { color: theme.colors.primary }]}>{prop.name}</Text>
                  <Text style={[styles.code, styles.propType, { color: theme.colors.secondary }]}>{prop.type}</Text>
                </View>
                <Text variant='bodySmall' style={[styles.propDesc, { color: theme.colors.onSurfaceVariant }]}>
                  {prop.desc}
                </Text>
              </View>
            ))}
          </Surface>

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Usage
          </Text>
          <Surface style={[styles.codeBlock, { backgroundColor: theme.colors.surfaceVariant }]} elevation={0}>
            <Text style={[styles.code, { color: theme.colors.onSurfaceVariant }]}>{USAGE}</Text>
          </Surface>
        </ScrollView>
      </ScrollViewProvider>
    </View>
  )
}

const DrawerDemoPage = () => (
  <AllDrawersProvider>
    <DrawerDemoContent />
  </AllDrawersProvider>
)

const styles = StyleSheet.create({
  apiCard: { borderRadius: 12 },
  apiItem: {
    borderTopColor: 'rgba(128,128,128,0.2)',
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 16
  },
  apiItemFirst: { borderTopWidth: 0 },
  bullet: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  code: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    lineHeight: 20
  },
  codeBlock: { borderRadius: 12, padding: 16 },
  container: { paddingHorizontal: 16, paddingTop: 16 },
  desc: { marginTop: 8 },
  divider: { marginVertical: 20 },
  drawerContent: { flex: 1, paddingTop: 8 },
  drawerHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  fill: { flex: 1 },
  hint: { marginBottom: 12 },
  propDesc: { marginTop: 2 },
  propRow: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' },
  propType: { marginLeft: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sectionLabel: { marginBottom: 12 }
})

export default DrawerDemoPage
