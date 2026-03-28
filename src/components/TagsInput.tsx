/**
 * TagsInput
 *
 * Editor for an array of Tag models. Lets users add/remove tags and edit their titles.
 * Uses a surfaced card with a header and list of editable items.
 *
 * Example:
 *   <TagsInput value={tags} onChange={setTags} />
 */
import { randomUUID } from 'expo-crypto'
import { memo, useCallback, useEffect, useState } from 'react'
type Tag = { id: string; title?: string; color?: string }
import { StyleSheet, View, ViewStyle } from 'react-native'
import { TextInput } from 'react-native-paper'

import { icons, layout } from '../constants'
import { useTheme } from '../hooks'
import { Button } from './Button'
import { IconButton } from './IconButton'
import { Surface } from './Surface'
import { SwipeActionRow } from './SwipeActionRow'

/**
 * Props for {@link TagsInput}.
 *
 * @property disabled - Disables editing and add/remove actions when true.
 * @property onChange - Receives the new array of Tag items after any edit.
 * @property style - Optional container style for the Surface.
 * @property value - Array of Tag items.
 */
export type TagsInputProps = {
  disabled?: boolean
  onChange: (tags: Tag[]) => void
  style?: ViewStyle
  value?: Tag[]
}
const TagsInputInner = ({ disabled, onChange, style, value: data }: TagsInputProps) => {
  const { theme } = useTheme()
  const [openRowId, setOpenRowId] = useState<string>()
  const [tags, setTags] = useState(data || [])
  useEffect(() => setTags(data ? [...data] : []), [data])
  const handleAdd = useCallback(() => {
    const _tags = [...tags, { id: randomUUID() } as Tag]
    setTags(_tags)
    onChange?.(_tags)
  }, [tags, onChange])
  const handleCloseRows = useCallback(() => setOpenRowId(undefined), [])
  const handleOpenRow = useCallback((id: string, open: boolean) => {
    setOpenRowId((current) => (open ? id : current === id ? undefined : current))
  }, [])
  const handleRemove = useCallback(
    (id: string) => {
      const _tags = tags.filter((i) => i.id !== id)
      setTags(_tags)
      onChange?.(_tags)
    },
    [tags, onChange]
  )
  const handleTitle = useCallback(
    (id: string, title: string) => {
      const _tags = tags.reduce((a: Tag[], i: Tag) => a.concat(i.id === id ? Object.assign(i, { title }) : i), [])
      setTags(_tags)
      onChange?.(_tags)
    },
    [tags, onChange]
  )
  // const handleColor = (id: string, color: string) => {
  //   const _tags = tags.reduce((a: Tag[], i: Tag) => a.concat(i.id === id ? Object.assign(i, { color }) : i), [])
  //   if (onChange) onChange(_tags)
  // }
  const renderItem = useCallback(
    ({ id, color, title }: Tag, i: number) => (
      <SwipeActionRow
        key={id}
        action={
          <Button compact disabled={disabled === true} icon={icons.delete} mode='contained' buttonColor={theme.colors.errorContainer} textColor={theme.colors.onErrorContainer} onPress={() => handleRemove(id)}>
            Delete
          </Button>
        }
        actionWidth={96}
        contentStyle={styles.row}
        disabled={disabled}
        onOpenChange={(open) => handleOpenRow(id, open)}
        open={openRowId === id}
        style={styles.swipeRow}
      >
        <IconButton icon='color-palette' containerColor={color} iconColor={color} mode='contained' style={styles.color} />
        <TextInput onChangeText={(text) => handleTitle(id, text)} onFocus={handleCloseRows} style={styles.itemTitle} value={title || ''} placeholder='Title' autoCapitalize='none' disabled={disabled === true} dense mode='outlined' />
      </SwipeActionRow>
    ),
    [handleTitle, handleRemove, disabled]
  )
  return (
    <Surface elevation={3} style={[styles.surface, style]} title='Tags' right={<IconButton disabled={disabled === true} icon='add' onPress={handleAdd} />}>
      {tags.map(renderItem)}
    </Surface>
  )
}

const styles = StyleSheet.create({
  color: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 2
    // width: 100
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 4,
    width: '100%'
  },
  itemTitle: {
    flex: 1,
    marginHorizontal: 2,
    textAlign: 'auto'
  },
  row: {
    alignItems: 'stretch',
    flexDirection: 'row',
    width: '100%'
  },
  surface: {
    alignItems: 'flex-end',
    borderRadius: layout.borderRadius,
    padding: 8
  },
  swipeRow: {
    marginVertical: 4,
    width: '100%'
  }
})

export const TagsInput = memo(TagsInputInner) as typeof TagsInputInner
