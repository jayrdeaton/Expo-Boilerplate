import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Surface } from 'react-native-paper'

import { layout } from '../constants'
import { ImageOrIcon } from './ImageOrIcon'
import { Row } from './Row'
import { TextAndCaption } from './TextAndCaption'

export type ItemListCountProps = {
  collection: string
  count: number
  icon: string
  total: number
}

export const ItemListCount = ({ collection, icon, count, total }: ItemListCountProps) => {
  const totalText = useMemo(() => `${count} of ${total}`, [count, total])
  return (
    <Surface elevation={5} style={styles.total}>
      <Row style={styles.row}>
        <ImageOrIcon icon={icon} style={styles.icon} />
        <TextAndCaption text={totalText} caption={collection} />
      </Row>
    </Surface>
  )
}
const styles = StyleSheet.create({
  icon: { marginRight: 2 },
  row: { alignItems: 'center' },
  total: { borderRadius: 8, marginHorizontal: 4, marginTop: 4, paddingHorizontal: 8, paddingVertical: 4, width: layout.window.width / 2 - 40 }
})
