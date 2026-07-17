import { ScrollView, ScrollViewHeader, ScrollViewProvider } from '@rific/scroll-view'
import { Stack, useRouter } from 'expo-router'
import { Platform, StyleSheet, View } from 'react-native'
import { Divider, Surface, Text, useTheme } from 'react-native-paper'

const FEATURES = ['Auto-grows vertically with content as the user types', 'Drag handle lets users manually resize the input', 'Configurable min/max height constraints', 'initialHeight for a fixed starting size', 'Defaults to react-native-paper TextInput when installed (optional peer) — override via TextInputComponent', 'Forwarded ref for imperative focus control', 'onHeightChange callback for layout-aware UIs', 'renderHandle prop for a fully custom resize handle', 'handleColor for quick handle tint without a custom renderer']

const PROPS = [
  { name: 'autoGrow', type: 'boolean', desc: 'Grow with content as the user types. Default: true.' },
  { name: 'resizable', type: 'boolean', desc: 'Show a drag handle for manual resizing. Default: true.' },
  { name: 'minHeight', type: 'number', desc: 'Minimum height in pixels. Defaults to the natural single-line height.' },
  { name: 'maxHeight', type: 'number', desc: 'Maximum height. Input stops growing and scrolls beyond this.' },
  { name: 'initialHeight', type: 'number', desc: 'Explicit starting height, overriding natural baseline.' },
  { name: 'handleColor', type: 'string', desc: 'Tint color for the built-in drag handle.' },
  { name: 'renderHandle', type: '() => ReactNode', desc: 'Fully replace the default drag handle.' },
  { name: 'onHeightChange', type: '(h: number) => void', desc: 'Fires whenever the component height changes.' },
  { name: 'TextInputComponent', type: 'ComponentType', desc: 'Override the input component. Defaults to react-native-paper TextInput when installed, else the RN TextInput.' }
]

const USAGE = `import { ResizableInput } from '@rific/resizable-input'
import { TextInput } from 'react-native-paper'

// Basic auto-grow
<ResizableInput
  placeholder="Start typing…"
  minHeight={48}
  maxHeight={200}
/>

// With react-native-paper TextInput
<ResizableInput
  TextInputComponent={TextInput}
  mode="outlined"
  label="Notes"
  autoGrow
  resizable
  maxHeight={300}
  handleColor="#9c27b0"
/>`

const ResizableInputPage = () => {
  const router = useRouter()
  const theme = useTheme()

  return (
    <View style={[styles.fill, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollViewProvider>
        <ScrollViewHeader backAction={() => router.back()} title='@rific/resizable-input' />
        <ScrollView contentContainerStyle={styles.container}>
          <Text variant='headlineSmall'>Resizable Input</Text>
          <Text variant='bodyMedium' style={[styles.desc, { color: theme.colors.onSurfaceVariant }]}>
            Auto-growing, drag-resizable text input for React Native. Expands with content automatically and gives users a drag handle to resize manually. Drop-in compatible with react-native-paper TextInput.
          </Text>

          <Surface style={[styles.installBox, { backgroundColor: theme.colors.surfaceVariant }]} elevation={0}>
            <Text style={[styles.code, { color: theme.colors.onSurfaceVariant }]}>{'npm install @rific/resizable-input \\\n  react-native-gesture-handler react-native-reanimated'}</Text>
          </Surface>

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
  fill: { flex: 1 },
  installBox: { borderRadius: 8, marginTop: 16, padding: 12 },
  propDesc: { marginTop: 2 },
  propRow: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' },
  propType: { marginLeft: 8 },
  sectionLabel: { marginBottom: 12 }
})

export default ResizableInputPage
