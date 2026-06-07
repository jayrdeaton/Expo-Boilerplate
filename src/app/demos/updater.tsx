import { Button } from '@rific/haptic-press'
import { useUpdater } from '@rific/updater'
import { Stack } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Chip, Divider, Surface, Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const INFO_ITEMS = [
  {
    label: 'autoCheck (default: true)',
    desc: 'Silently polls for updates on every app foreground event. No UI is shown unless an update is found.'
  },
  {
    label: 'onConfirm callback',
    desc: 'Called with the update manifest when a new build is available. Return true to reload immediately, false to defer. Receives createdAt and optional metadata.'
  },
  {
    label: 'updateReady',
    desc: 'Flips to true after a new bundle is downloaded and ready. Use it to show a custom "restart to update" badge in your UI.'
  },
  {
    label: 'check()',
    desc: 'Manually triggers an update fetch. Useful in a settings screen, debug panel, or pull-to-refresh handler.'
  }
]

const UpdaterDemo = () => {
  const theme = useTheme()
  const { check, checking, updateReady } = useUpdater({ autoCheck: false })

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
      <Stack.Screen options={{ title: '@rific/updater' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant='headlineSmall'>Updater</Text>
        <Text variant='bodyMedium' style={[styles.desc, { color: theme.colors.onSurfaceVariant }]}>
          OTA update hook for Expo apps. Silently fetches updates on every foreground resume with no UI interruption. Exposes a manual check function and an optional confirmation callback before applying the update.
        </Text>

        <Divider style={styles.divider} />
        <Text variant='titleMedium' style={styles.sectionLabel}>
          Status
        </Text>
        <View style={styles.row}>
          <Chip icon={checking ? 'loading' : 'check-circle-outline'} selected={checking}>
            {checking ? 'Checking…' : 'Idle'}
          </Chip>
          <Chip icon={updateReady ? 'arrow-up-circle-outline' : 'check-circle-outline'} selected={updateReady}>
            {updateReady ? 'Update Ready' : 'Up to Date'}
          </Chip>
        </View>

        <Divider style={styles.divider} />
        <Text variant='titleMedium' style={styles.sectionLabel}>
          Manual Check
        </Text>
        <Button mode='contained' onPress={check} disabled={checking} loading={checking}>
          {checking ? 'Checking…' : 'Check for Update'}
        </Button>

        <Divider style={styles.divider} />
        <Text variant='titleMedium' style={styles.sectionLabel}>
          How It Works
        </Text>
        <Surface style={[styles.infoCard, { backgroundColor: theme.colors.surfaceVariant }]} elevation={0}>
          {INFO_ITEMS.map((item, i) => (
            <View key={item.label} style={[styles.infoItem, i === 0 && styles.infoItemFirst]}>
              <Text variant='labelMedium'>{item.label}</Text>
              <Text variant='bodySmall' style={[styles.infoItemDesc, { color: theme.colors.onSurfaceVariant }]}>
                {item.desc}
              </Text>
            </View>
          ))}
        </Surface>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },
  desc: { marginTop: 8 },
  divider: { marginVertical: 20 },
  fill: { flex: 1 },
  infoCard: { borderRadius: 12 },
  infoItem: {
    borderTopColor: 'rgba(128,128,128,0.2)',
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 16
  },
  infoItemDesc: { marginTop: 4 },
  infoItemFirst: { borderTopWidth: 0 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sectionLabel: { marginBottom: 12 }
})

export default UpdaterDemo
