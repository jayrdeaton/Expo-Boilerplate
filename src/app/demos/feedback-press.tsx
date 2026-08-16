import { AppbarAction, Button, Card, Checkbox, Chip, FAB, IconButton, SegmentedButtons, Switch, useVibration } from '@rific/feedback-press'
import { ScrollView, ScrollViewHeader, ScrollViewProvider } from '@rific/scroll-view'
import { NotificationFeedbackType } from 'expo-haptics'
import { Stack, useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Text, useTheme } from 'react-native-paper'

import { useFeedbackSounds } from '@/hooks/useFeedbackSounds'

const FeedbackPressDemo = () => {
  const router = useRouter()
  const theme = useTheme()
  const vibration = useVibration()
  const { playPop } = useFeedbackSounds()
  const [checked, setChecked] = useState(true)
  const [switchOn, setSwitchOn] = useState(true)
  const [segment, setSegment] = useState('day')

  return (
    <View style={[styles.fill, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollViewProvider>
        <ScrollViewHeader backAction={() => router.back()} title='Feedback Press' caption='@rific/feedback-press' />
        <ScrollView contentContainerStyle={styles.container}>
          <Text variant='bodyMedium' style={[styles.desc, { color: theme.colors.onSurfaceVariant }]}>
            Drop-in replacements for react-native-paper pressable components (Button, IconButton, TouchableRipple, Card, Chip, AppbarBackAction, AppbarAction, FAB, Checkbox, Switch, SegmentedButtons) that automatically fire expo-haptics on press, plus an app-supplied sound at the same instant. Enabled/disabled globally via FeedbackPressProvider.
          </Text>

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Haptic Types
          </Text>
          <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            Tap to feel each vibration pattern.
          </Text>
          <View style={styles.row}>
            {[
              { label: 'Short', fn: () => vibration.forceShort() },
              { label: 'Medium', fn: () => vibration.forceMedium() },
              { label: 'Long', fn: () => vibration.forceLong() },
              { label: 'Double', fn: () => vibration.forceDouble() }
            ].map((h) => (
              <Button key={h.label} mode='outlined' onPress={h.fn} compact>
                {h.label}
              </Button>
            ))}
          </View>

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Notification Types
          </Text>
          <View style={styles.row}>
            {[
              { label: 'Success', fn: () => vibration.notification(NotificationFeedbackType.Success) },
              { label: 'Warning', fn: () => vibration.notification(NotificationFeedbackType.Warning) },
              { label: 'Error', fn: () => vibration.notification(NotificationFeedbackType.Error) }
            ].map((h) => (
              <Button key={h.label} mode='contained' onPress={h.fn} compact>
                {h.label}
              </Button>
            ))}
          </View>

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Sound
          </Text>
          <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            The provider is configured with a click sound on selection. Each button below overrides that per-instance.
          </Text>
          <View style={[styles.row, styles.item]}>
            <Button mode='outlined' onPress={() => {}}>
              Haptic + sound
            </Button>
            <Button mode='outlined' soundDisabled onPress={() => {}}>
              soundDisabled
            </Button>
            <Button mode='outlined' hapticDisabled onPress={() => {}}>
              hapticDisabled
            </Button>
            <Button mode='outlined' sound={{ selection: playPop }} onPress={() => {}}>
              Custom sound
            </Button>
          </View>

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Wrapped Components
          </Text>
          <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            Each is a drop-in replacement for its react-native-paper counterpart: same API, haptics and sound added automatically.
          </Text>

          <Button mode='contained' style={styles.item} onPress={() => {}}>
            Button (contained)
          </Button>
          <Button mode='outlined' style={styles.item} onPress={() => {}}>
            Button (outlined)
          </Button>

          <View style={[styles.row, styles.item]}>
            <Chip onPress={() => {}}>Chip</Chip>
            <Chip onPress={() => {}} selected>
              Chip selected
            </Chip>
            <Chip onPress={() => {}} icon='star'>
              With icon
            </Chip>
          </View>

          <Card style={styles.item} onPress={() => {}}>
            <Card.Title title='Feedback Card' subtitle='Press anywhere on this card for haptic + sound feedback' />
          </Card>

          <View style={styles.fabRow}>
            <FAB icon='plus' size='small' onPress={() => {}} />
            <FAB icon='check' size='small' mode='flat' onPress={() => {}} />
            <FAB icon='heart' size='small' mode='elevated' onPress={() => {}} />
          </View>

          <View style={[styles.row, styles.item]}>
            <IconButton icon='star-outline' onPress={() => {}} />
            <AppbarAction icon='dots-vertical' onPress={() => {}} />
          </View>

          <View style={[styles.row, styles.item]}>
            <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked((c) => !c)} />
            <Switch value={switchOn} onValueChange={setSwitchOn} />
          </View>

          <SegmentedButtons
            style={styles.item}
            value={segment}
            onValueChange={(value) => setSegment(Array.isArray(value) ? value[0] : value)}
            buttons={[
              { value: 'day', label: 'Day' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' }
            ]}
          />
        </ScrollView>
      </ScrollViewProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 16 },
  desc: { marginTop: 0 },
  divider: { marginVertical: 20 },
  fabRow: { flexDirection: 'row', gap: 16, justifyContent: 'center', paddingVertical: 8 },
  fill: { flex: 1 },
  hint: { marginBottom: 12 },
  item: { marginBottom: 12 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sectionLabel: { marginBottom: 8 }
})

export default FeedbackPressDemo
