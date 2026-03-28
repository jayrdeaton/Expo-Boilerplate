import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

import { Panel, PanelProps } from './Panel'

export type InfoPanelProps<T> = {
  item?: T
} & Omit<PanelProps, 'children'>

export const InfoPanel = <T extends { info?: string | null }>({ item, style, ...props }: InfoPanelProps<T>) => {
  return item?.info ? (
    <Panel elevation={3} style={[styles.info, style]} {...props}>
      <Text variant='bodyMedium'>{item?.info}</Text>
    </Panel>
  ) : null
}

const styles = StyleSheet.create({
  info: {
    padding: 4
  }
})
