/**
 * MetadataInput
 *
 * Key/value editor for metadata fields. Supports module-based key sets and omissions
 * from other modules. Provides search to filter visible keys.
 *
 * Example:
 *   <MetadataInput module="product" value={meta} onChange={setMeta} />
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput as RNTextInput, View, ViewStyle } from 'react-native'

import { icons } from '../constants'
import { useTheme } from '../hooks'
import { Button } from './Button'
import { IconButton } from './IconButton'
import { Surface } from './Surface'
import { SwipeActionRow } from './SwipeActionRow'
import { TextInput } from './TextInput'

/**
 * Props for {@link MetadataInput}.
 *
 * @property disabled - Disables edits when true.
 * @property module - Optional module key to constrain available metadata keys.
 * @property omit - Optional list of module keys whose fields should be removed.
 * @property onChange - Receives the updated metadata object.
 * @property style - Optional container style for the Surface.
 * @property value - Current metadata map (key -> value) or null.
 */
export type MetadataInputProps = {
  disabled?: boolean
  module?: string
  omit?: string[]
  onChange: (metadata: { [key: string]: string }) => void
  onDone?: () => void
  style?: ViewStyle
  value?: { [key: string]: string } | null
}

export type MetadataInputHandle = {
  focus: () => void
}

export const MetadataInput = React.forwardRef<MetadataInputHandle, MetadataInputProps>(({ disabled, module: moduleKey, omit, onChange, style, value: data, onDone }, ref) => {
  const { theme } = useTheme()
  const [metadata, setMetadata] = useState(data || {})
  const [openRowId, setOpenRowId] = useState<string>()
  const keyRefs = useRef<Record<string, RNTextInput>>({})
  const valueRefs = useRef<Record<string, RNTextInput>>({})
  useEffect(() => {
    const _metadata = {}
    Object.assign(_metadata, data)
    setMetadata(_metadata)
  }, [data])
  const handleCloseRows = useCallback(() => setOpenRowId(undefined), [])
  const handleOpenRow = useCallback((id: string, open: boolean) => {
    setOpenRowId((current) => (open ? id : current === id ? undefined : current))
  }, [])
  const handleAdd = () => {
    const _metadata = Object.assign({ '': '' }, metadata)
    setMetadata(_metadata)
    if (onChange) onChange(_metadata)
  }
  const handleKey = (old_key: string, new_key: string) => {
    const _metadata = Object.keys(metadata).reduce((a: { [key: string]: string }, k) => {
      if (k === old_key) {
        a[new_key] = metadata[k]
      } else {
        a[k] = metadata[k]
      }
      return a
    }, {})
    setMetadata(_metadata)
    if (onChange) onChange(_metadata)
  }
  const handleRemove = (key: string) => {
    const _metadata = Object.assign({}, metadata)
    delete _metadata[key]
    setMetadata(_metadata)
    if (onChange) onChange(_metadata)
  }
  const handleValue = (key: string, value: string) => {
    const _metadata = Object.assign({}, metadata, { [key]: value })
    setMetadata(_metadata)
    if (onChange) onChange(_metadata)
  }
  const renderItem = (key: string, i: number, keys: string[]) => {
    const value = metadata[key]
    if (!keyRefs.current[key]) keyRefs.current[key] = null
    if (!valueRefs.current[key]) valueRefs.current[key] = null
    const rowId = String(i)
    return (
      <SwipeActionRow
        key={i}
        action={
          <Button compact disabled={disabled === true} icon={icons.delete} mode='contained' buttonColor={theme.colors.errorContainer} textColor={theme.colors.onErrorContainer} onPress={() => handleRemove(key)}>
            Delete
          </Button>
        }
        actionWidth={96}
        contentStyle={styles.row}
        disabled={disabled}
        onOpenChange={(open) => handleOpenRow(rowId, open)}
        open={openRowId === rowId}
        style={styles.swipeRow}
      >
        <TextInput
          ref={(ref) => {
            keyRefs.current[key] = ref
          }}
          autoCapitalize='none'
          disabled={disabled === true}
          onChangeText={(text) => handleKey(key, text || '')}
          onFocus={handleCloseRows}
          placeholder='Key'
          style={styles.key}
          value={key}
          returnKeyType='next'
          onSubmitEditing={() => valueRefs.current[key]?.focus?.()}
        />
        <View style={styles.group}>
          <TextInput
            ref={(ref) => {
              valueRefs.current[key] = ref
            }}
            autoCapitalize='none'
            disabled={disabled === true}
            onChangeText={(text) => handleValue(key, text || '')}
            onFocus={handleCloseRows}
            placeholder='Value'
            style={styles.value}
            value={value}
            returnKeyType='next'
            onSubmitEditing={() => {
              const nextKey = keys[i + 1]
              if (nextKey && keyRefs.current[nextKey]) keyRefs.current[nextKey].focus()
              else if (onDone) onDone()
              else valueRefs.current[key]?.blur?.()
            }}
          />
        </View>
      </SwipeActionRow>
    )
  }
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      const keys = Object.keys(metadata)
      const first = keys[0]
      if (first && keyRefs.current[first]) keyRefs.current[first].focus()
    }
  }))

  return (
    <Surface style={style} title='Metadata' right={<IconButton disabled={Object.keys(metadata).includes('') || disabled === true} icon={icons.add} onPress={handleAdd} />}>
      {Object.keys(metadata).map((k, i, arr) => renderItem(k, i, arr))}
    </Surface>
  )
})

MetadataInput.displayName = 'MetadataInput'
const styles = StyleSheet.create({
  group: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 3,
    margin: 2
  },
  key: {
    flex: 2,
    margin: 2,
    textAlign: 'auto'
  },
  row: {
    alignItems: 'stretch',
    flexDirection: 'row',
    width: '100%'
  },
  swipeRow: {
    marginVertical: 2,
    width: '100%'
  },
  value: {
    flex: 1,
    textAlign: 'auto'
  }
})
