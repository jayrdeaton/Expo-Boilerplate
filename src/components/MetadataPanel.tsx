import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { Panel, PanelProps } from './Panel'

export type MetadataPanelProps<T> = {
  item?: T
  module?: string
  omit?: string[]
} & Omit<PanelProps, 'children'>

export const MetadataPanel = <T extends { metadata?: { [key: string]: string } }>({ item, ...props }: MetadataPanelProps<T>) => {
  const metadata = item?.metadata || {}

  const renderMetadata = (key: string, index: number) => (
    <View key={index} style={styles.metadata}>
      <Text variant='bodySmall'>{key.replace(/_/g, ' ')}</Text>
      <Text>{metadata[key]}</Text>
    </View>
  )

  return (
    <Panel elevation={1} {...props}>
      <Text variant='titleMedium'>Metadata</Text>
      {!Object.keys(metadata).length ? <Text>No Metadata</Text> : Object.keys(metadata).sort().map(renderMetadata)}
    </Panel>
  )
}

const styles = StyleSheet.create({
  metadata: {
    width: '100%'
  }
})
