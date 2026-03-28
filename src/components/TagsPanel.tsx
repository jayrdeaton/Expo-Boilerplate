import { StyleSheet, ViewStyle } from 'react-native'
import { Chip } from 'react-native-paper'

type Tag = { id: string; title?: string; color?: string }

import { layout } from '../constants'
import { getTextColor } from '../utils'

export type TagsPanelProps<T> = {
  item?: T
  style?: ViewStyle
}

export const TagsPanel = <T extends { tags: Tag[] }>({ item, style }: TagsPanelProps<T>) => {
  const hasTags = item?.tags?.length

  return hasTags ? (
    item.tags.map((tag) => (
      <Chip key={tag.id} textStyle={[styles.text, { color: getTextColor(tag.color) }]} style={[styles.tag, style, { backgroundColor: tag.color }]}>
        {tag.title}
      </Chip>
    ))
  ) : (
    <Chip compact textStyle={styles.text} style={[styles.tag, style]}>
      No Tags
    </Chip>
  )
}

const styles = StyleSheet.create({
  tag: { borderRadius: layout.borderRadius, flexGrow: 1, margin: 2 },
  text: { flexGrow: 1, textAlign: 'center' }
})
