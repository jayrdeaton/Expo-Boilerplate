import { Stack } from 'expo-router'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import { Divider, Surface, Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const FEATURES = ['6 cell modes: solid, gradient, density, stacked, dots, priority', 'Animated entrance with configurable direction (ltr / rtl) and duration', 'Timeline variant — zoomable horizontal time-series view', 'Scatter plot variant for raw data distribution', 'Custom color scale with thresholds', 'Day and month label rendering', 'Tooltip with custom render function', 'Custom cell renderer for full control over appearance', 'onDayPress handler with date and data payload', 'Dark / light color scheme support', 'Auto-scaling from data range', 'Infinite scroll with onEndReached']

const PROPS = [
  { name: 'data', type: 'DataPoint[]', desc: 'Array of { date, value, color?, segments?, metadata? }' },
  { name: 'cellMode', type: 'CellMode', desc: '"solid" | "gradient" | "density" | "stacked" | "dots" | "priority"' },
  { name: 'colorScale', type: 'ColorScale', desc: '{ thresholds, colors, emptyColor? } for threshold-based coloring' },
  { name: 'animated', type: 'boolean', desc: 'Animate cells in on mount' },
  { name: 'animationDirection', type: '"ltr" | "rtl"', desc: 'Direction the animation sweeps across' },
  { name: 'showMonthLabels', type: 'boolean', desc: 'Render month labels above the grid' },
  { name: 'showDayLabels', type: 'boolean', desc: 'Render day-of-week labels on the left' },
  { name: 'onDayPress', type: 'function', desc: '(day, date) — called when a cell is tapped' },
  { name: 'renderTooltip', type: 'function', desc: 'Custom tooltip node rendered on cell press' },
  { name: 'renderCell', type: 'function', desc: 'Completely override cell rendering' },
  { name: 'autoScale', type: 'boolean', desc: 'Derive color thresholds from the data range automatically' }
]

const USAGE = `import { Heatmap } from '@rific/heatmap'

const data = [
  { date: '2024-01-15', value: 4 },
  { date: '2024-01-16', value: 12 },
  { date: '2024-01-17', value: 7 },
  // ...
]

<Heatmap
  data={data}
  cellMode="gradient"
  color="#4caf50"
  animated
  animationDirection="ltr"
  showMonthLabels
  showDayLabels
  onDayPress={(day, date) => console.log(date, day?.value)}
/>`

const HeatmapPage = () => {
  const theme = useTheme()

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
      <Stack.Screen options={{ title: '@rific/heatmap' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant='headlineSmall'>Heatmap</Text>
        <Text variant='bodyMedium' style={[styles.desc, { color: theme.colors.onSurfaceVariant }]}>
          GitHub-style activity heatmap for React Native with SVG rendering. Supports six cell visualization modes, an animated entrance, an inline timeline view, and full customization of colors, labels, and tooltips.
        </Text>

        <Surface style={[styles.installBox, { backgroundColor: theme.colors.surfaceVariant }]} elevation={0}>
          <Text style={[styles.code, { color: theme.colors.onSurfaceVariant }]}>npm install @rific/heatmap react-native-svg</Text>
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
    </SafeAreaView>
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
  container: { padding: 16, paddingBottom: 32 },
  desc: { marginTop: 8 },
  divider: { marginVertical: 20 },
  fill: { flex: 1 },
  installBox: { borderRadius: 8, marginTop: 16, padding: 12 },
  propDesc: { marginTop: 2 },
  propRow: { alignItems: 'center', flexDirection: 'row' },
  propType: { marginLeft: 8 },
  sectionLabel: { marginBottom: 12 }
})

export default HeatmapPage
