import { AppbarAction, Button, Card, Checkbox, Chip, FAB, IconButton, SegmentedButtons, Switch, useHoldToRepeat, useHoldToRepeatByKey, useVibration } from '@rific/feedback-press'
import { ScrollView, ScrollViewHeader, ScrollViewProvider } from '@rific/scroll-view'
import { NotificationFeedbackType } from 'expo-haptics'
import { Stack, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Text, useTheme } from 'react-native-paper'

import { useFeedbackSounds } from '@/hooks/useFeedbackSounds'

const HOLD_KEYS = ['A', 'B', 'C'] as const

const FeedbackPressDemo = () => {
  const router = useRouter()
  const theme = useTheme()
  const vibration = useVibration()
  const { playChime, playBuzz } = useFeedbackSounds()
  const [checked, setChecked] = useState(true)
  const [switchOn, setSwitchOn] = useState(true)
  const [segment, setSegment] = useState('day')

  const [count, setCount] = useState(0)
  const increment = useCallback(() => setCount((c) => c + 1), [])
  const decrement = useCallback(() => setCount((c) => c - 1), [])
  const incrementHold = useHoldToRepeat(increment, 400)
  const decrementHold = useHoldToRepeat(decrement, 400)

  const [keyedCounts, setKeyedCounts] = useState<Record<string, number>>({})
  const bumpKey = useCallback((key: string) => setKeyedCounts((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 })), [])
  const keyedHold = useHoldToRepeatByKey(bumpKey, 400)

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
            The provider plays a click on press and a pop on long-press by default. Press and hold each button below to hear both.
          </Text>
          <Button mode='contained' style={styles.item} onPress={() => {}} onLongPress={() => {}}>
            Provider default (press: click · hold: pop)
          </Button>
          <View style={[styles.row, styles.item]}>
            <Button mode='outlined' soundDisabled onPress={() => {}} onLongPress={() => {}}>
              soundDisabled
            </Button>
            <Button mode='outlined' hapticDisabled onPress={() => {}} onLongPress={() => {}}>
              hapticDisabled
            </Button>
            <Button mode='outlined' sound={{ selection: playChime, notification: playBuzz }} onPress={() => {}} onLongPress={() => {}}>
              Custom sound (press: chime · hold: buzz)
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

          <Divider style={styles.divider} />
          <Text variant='titleMedium' style={styles.sectionLabel}>
            Hold to Repeat
          </Text>
          <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            useHoldToRepeat fires an action immediately once you&apos;ve held past delayLongPress, then again every 400ms for as long as you keep holding — with a haptic + sound pulse on every tick, not just the first. Release to stop instantly. Press and hold, don&apos;t tap.
          </Text>
          <View style={styles.holdRow}>
            <FAB icon='minus' size='small' onLongPress={decrementHold.onLongPress} onPressOut={decrementHold.onPressOut} delayLongPress={400} />
            <Text variant='headlineSmall' style={styles.holdCount}>
              {count}
            </Text>
            <FAB icon='plus' size='small' onLongPress={incrementHold.onLongPress} onPressOut={incrementHold.onPressOut} delayLongPress={400} />
          </View>

          <Text variant='titleMedium' style={[styles.sectionLabel, styles.item]}>
            Hold to Repeat (keyed)
          </Text>
          <Text variant='bodySmall' style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
            useHoldToRepeatByKey keeps a separate timer per key — hold two of these at once (two fingers) and each repeats on its own cadence; releasing one never stops the other.
          </Text>
          <View style={styles.row}>
            {HOLD_KEYS.map((key) => (
              <View key={key} style={styles.keyedItem}>
                <Text variant='labelLarge'>
                  {key}: {keyedCounts[key] ?? 0}
                </Text>
                <FAB icon='plus' size='small' onLongPress={keyedHold.onLongPress(key)} onPressOut={keyedHold.onPressOut(key)} delayLongPress={400} />
              </View>
            ))}
          </View>
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
  holdCount: { minWidth: 40, textAlign: 'center' },
  holdRow: { alignItems: 'center', flexDirection: 'row', gap: 16, justifyContent: 'center', paddingVertical: 8 },
  item: { marginBottom: 12 },
  keyedItem: { alignItems: 'center', gap: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sectionLabel: { marginBottom: 8 }
})

export default FeedbackPressDemo
