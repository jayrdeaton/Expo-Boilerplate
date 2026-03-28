import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { useTheme } from '../hooks'
import { Panel } from './Panel'
import { Row } from './Row'

export const PaletteDebugger = () => {
  const { theme } = useTheme()
  return (
    <View>
      <Row>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.text, { color: theme.colors.onPrimary }]}>Primary</Text>
        </Panel>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.secondary }]}>
          <Text style={[styles.text, { color: theme.colors.onSecondary }]}>Secondary</Text>
        </Panel>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.tertiary }]}>
          <Text style={[styles.text, { color: theme.colors.onTertiary }]}>Tertiary</Text>
        </Panel>
      </Row>
      <Row>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.primaryContainer }]}>
          <Text style={[styles.text, { color: theme.colors.onPrimaryContainer }]}>Primary Container</Text>
        </Panel>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.secondaryContainer }]}>
          <Text style={[styles.text, { color: theme.colors.onSecondaryContainer }]}>Secondary Container</Text>
        </Panel>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.tertiaryContainer }]}>
          <Text style={[styles.text, { color: theme.colors.onTertiaryContainer }]}>Tertiary Container</Text>
        </Panel>
      </Row>
      <Row>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.text, { color: theme.colors.onBackground }]}>Card</Text>
        </Panel>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.text, { color: theme.colors.onBackground }]}>Background</Text>
        </Panel>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.backdrop }]}>
          <Text style={[styles.text, { color: theme.colors.inverseOnSurface }]}>Backdrop</Text>
        </Panel>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.surfaceDisabled }]}>
          <Text style={[styles.text, { color: theme.colors.onSurfaceDisabled }]}>Disabled</Text>
        </Panel>
      </Row>
      <Row>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.outline }]}>
          <Text style={[styles.text, { color: theme.colors.onPrimary }]}>Outline</Text>
        </Panel>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.outlineVariant }]}>
          <Text style={[styles.text, { color: theme.colors.onPrimary }]}>OutlineVariant</Text>
        </Panel>
      </Row>
      <Row>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.inversePrimary }]}>
          <Text style={[styles.text, { color: theme.colors.onPrimary }]}>Inverse Primary</Text>
        </Panel>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.inverseSurface }]}>
          <Text style={[styles.text, { color: theme.colors.inverseOnSurface }]}>Inverse Surface</Text>
        </Panel>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.error }]}>
          <Text style={[styles.text, { color: theme.colors.onError }]}>Error</Text>
        </Panel>
        <Panel style={[styles.panel, { backgroundColor: theme.colors.errorContainer }]}>
          <Text style={[styles.text, { color: theme.colors.onErrorContainer }]}>Error Container</Text>
        </Panel>
      </Row>
      <Row>
        <Panel elevation={0} style={styles.panel}>
          <Text style={styles.text}>0</Text>
        </Panel>
        <Panel elevation={1} style={styles.panel}>
          <Text style={styles.text}>1</Text>
        </Panel>
        <Panel elevation={2} style={styles.panel}>
          <Text style={styles.text}>2</Text>
        </Panel>
        <Panel elevation={3} style={styles.panel}>
          <Text style={styles.text}>3</Text>
        </Panel>
        <Panel elevation={4} style={styles.panel}>
          <Text style={styles.text}>4</Text>
        </Panel>
        <Panel elevation={5} style={styles.panel}>
          <Text style={styles.text}>5</Text>
        </Panel>
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  panel: { flex: 1, height: 60 },
  text: { textAlign: 'center' }
})
