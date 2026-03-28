import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { icons } from '../constants'
import { IconButton } from './IconButton'
import { Row } from './Row'

export type CollapsibleHeaderProps = {
  icon: string
  onPress: () => void
  title: string
  visible: boolean
}

export const CollapsibleHeader = ({ icon, onPress, title, visible }: CollapsibleHeaderProps) => (
  <Row style={styles.row}>
    <IconButton icon={icon} />
    <Text variant='titleMedium'>{title}</Text>
    <View style={styles.spacer} />
    <IconButton icon={visible ? icons.collapse : icons.expand} onPress={onPress} />
  </Row>
)
const styles = StyleSheet.create({
  row: { alignItems: 'center' },
  spacer: { flex: 2 }
})
