/**
 * TitlePanel
 *
 * Displays an item's title (and id when debug is enabled) inside a panel.
 *
 * Example:
 *   <TitlePanel item={product} />
 */
import { StyleSheet, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { Panel, PanelProps } from './Panel'

/**
 * Props for {@link TitlePanel}.
 *
 * @property item - Object optionally containing `title` and `id` for display.
 * @property style - Optional panel style.
 */
export type TitlePanelProps<T> = {
  item?: T
  style?: ViewStyle
} & Omit<PanelProps, 'children'>

export const TitlePanel = <T extends { id?: string; title?: string | null; subtitle?: string | null; description?: string | null }>({ item, ...props }: TitlePanelProps<T>) => {
  const subtitle = item?.subtitle?.trim()
  const description = item?.description?.trim()

  return (
    <Panel elevation={3} {...props}>
      <Text variant='headlineSmall' style={styles.title}>
        {item?.title}
      </Text>
      {subtitle ? (
        <Text variant='titleMedium' style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
      {description ? (
        <Text variant='bodyMedium' style={styles.description}>
          {description}
        </Text>
      ) : null}
    </Panel>
  )
}

const styles = StyleSheet.create({
  description: { marginTop: 4, textAlign: 'center' },
  subtitle: { marginTop: 8, textAlign: 'center' },
  title: { textAlign: 'center' }
})
