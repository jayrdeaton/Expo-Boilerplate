import { Button } from '@rific/haptic-press'
import { useToast } from '@rific/toaster'
import { Stack } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Divider, Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const ToasterDemo = () => {
  const theme = useTheme()
  const toast = useToast()

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
      <Stack.Screen options={{ title: '@rific/toaster' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant='headlineSmall'>Toaster</Text>
        <Text variant='bodyMedium' style={[styles.desc, { color: theme.colors.onSurfaceVariant }]}>
          Stacking, animated toast notifications with swipe-to-dismiss, a capped visible limit, and a history drawer. Toasts are triggered imperatively via a hook from anywhere in your component tree.
        </Text>

        <Divider style={styles.divider} />
        <Text variant='titleMedium' style={styles.sectionLabel}>
          Toast Levels
        </Text>
        <View style={styles.row}>
          <Button mode='contained' onPress={() => toast.success('Saved successfully')} compact>
            Success
          </Button>
          <Button mode='contained' onPress={() => toast.error('Something went wrong')} compact>
            Error
          </Button>
          <Button mode='contained' onPress={() => toast.warning('Check your input')} compact>
            Warning
          </Button>
          <Button mode='contained' onPress={() => toast.info('Update available')} compact>
            Info
          </Button>
        </View>

        <Divider style={styles.divider} />
        <Text variant='titleMedium' style={styles.sectionLabel}>
          With Caption
        </Text>
        <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
          A second string adds a subtitle line below the title.
        </Text>
        <View style={styles.row}>
          <Button mode='outlined' onPress={() => toast.success('Record created', 'ID #4821 saved to database')} compact>
            Success + caption
          </Button>
          <Button mode='outlined' onPress={() => toast.error('Upload failed', 'File exceeds 10 MB limit')} compact>
            Error + caption
          </Button>
          <Button mode='outlined' onPress={() => toast.warning('Session expiring', 'You will be logged out in 5 minutes')} compact>
            Warning + caption
          </Button>
        </View>

        <Divider style={styles.divider} />
        <Text variant='titleMedium' style={styles.sectionLabel}>
          Stack Demo
        </Text>
        <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
          Fire multiple toasts quickly to see them stack and queue.
        </Text>
        <Button
          mode='contained'
          style={styles.item}
          onPress={() => {
            toast.success('First')
            setTimeout(() => toast.info('Second'), 250)
            setTimeout(() => toast.warning('Third'), 500)
          }}
        >
          Fire 3 Toasts
        </Button>

        <Divider style={styles.divider} />
        <Text variant='titleMedium' style={styles.sectionLabel}>
          History
        </Text>
        <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
          All dismissed toasts are kept in a history stack accessible via a bottom drawer.
        </Text>
        <View style={styles.row}>
          <Button mode='outlined' onPress={toast.openHistory}>
            View History ({toast.history.length})
          </Button>
          <Button mode='outlined' onPress={toast.clear}>
            Dismiss All
          </Button>
          <Button mode='outlined' onPress={toast.clearHistory}>
            Clear History
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },
  desc: { marginTop: 8 },
  divider: { marginVertical: 20 },
  fill: { flex: 1 },
  hint: { marginBottom: 12 },
  item: { marginBottom: 12 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sectionLabel: { marginBottom: 8 }
})

export default ToasterDemo
