import { ScrollView, ScrollViewHeader, ScrollViewProvider } from '@rific/scroll-view'
import { Stack, useRouter } from 'expo-router'
import { Platform, StyleSheet, View } from 'react-native'
import { Divider, Surface, Text, useTheme } from 'react-native-paper'

const FEATURES = ['Single hook — no refs, no state, no useEffect', 'Works with any focusable component (TextInput, custom inputs)', 'Call order determines focus order — no indices to manage', 'onSubmitEditing auto-wired to advance to the next field', 'Last field in the chain can submit the form']

const API_ITEMS = [
  { name: 'useFocusChain()', desc: 'Returns a register factory. Call once at the top of your component.' },
  { name: 'register()', desc: 'Call once per input in order. Returns { ref, onSubmitEditing, focus }.' },
  { name: 'ref', desc: 'Pass to the input ref prop to register the focusable element.' },
  {
    name: 'onSubmitEditing',
    desc: 'Pass to onSubmitEditing. Focuses the next registered input automatically.'
  },
  { name: 'focus()', desc: 'Imperatively focus this specific input from anywhere.' }
]

const USAGE = `import { useFocusChain } from '@rific/focus-chain'

const MyForm = () => {
  const register = useFocusChain()
  const first = register()
  const second = register()
  const third = register()

  return (
    <>
      <TextInput
        {...first}
        returnKeyType="next"
        placeholder="First name"
      />
      <TextInput
        {...second}
        returnKeyType="next"
        placeholder="Last name"
      />
      <TextInput
        {...third}
        returnKeyType="done"
        placeholder="Email"
        onSubmitEditing={handleSubmit}
      />
    </>
  )
}`

const FocusChainPage = () => {
  const router = useRouter()
  const theme = useTheme()

  return (
    <View style={[styles.fill, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollViewProvider>
        <ScrollViewHeader backAction={() => router.back()} title='@rific/focus-chain' />
        <ScrollView contentContainerStyle={styles.container}>
          <Text variant='headlineSmall'>Focus Chain</Text>
          <Text variant='bodyMedium' style={[styles.desc, { color: theme.colors.onSurfaceVariant }]}>
            Auto-advancing focus chain for React Native form inputs. Call the hook once, spread the result onto each input in order — pressing Next or Return automatically moves focus to the next field with no wiring required.
          </Text>

          <Surface style={[styles.installBox, { backgroundColor: theme.colors.surfaceVariant }]} elevation={0}>
            <Text style={[styles.code, { color: theme.colors.onSurfaceVariant }]}>npm install @rific/focus-chain</Text>
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
            API
          </Text>
          <Surface style={[styles.apiCard, { backgroundColor: theme.colors.surfaceVariant }]} elevation={0}>
            {API_ITEMS.map((item, i) => (
              <View key={item.name} style={[styles.apiItem, i === 0 && styles.apiItemFirst]}>
                <Text style={[styles.code, { color: theme.colors.primary }]}>{item.name}</Text>
                <Text variant='bodySmall' style={[styles.apiDesc, { color: theme.colors.onSurfaceVariant }]}>
                  {item.desc}
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
  apiDesc: { marginTop: 2 },
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
  sectionLabel: { marginBottom: 12 }
})

export default FocusChainPage
