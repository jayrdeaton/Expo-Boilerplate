import * as Clipboard from 'expo-clipboard'
import { useEffect, useMemo, useState } from 'react'
import { ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { useSettings, useSnack } from '../hooks'
import { Generic } from '../types'
import { Panel, PanelProps } from './Panel'

const keyString = (key: string): string => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace('Id', ' ID')
}

export type DebugPanelProps<T> = {
  item?: T
  style?: ViewStyle
} & Omit<PanelProps, 'children'>

export const DebugPanel = <T extends Generic>({ item, ...props }: DebugPanelProps<T>) => {
  const { debug } = useSettings()
  const snack = useSnack()
  const [keys, setKeys] = useState<string[]>([])
  const handleCopy = (key: string, string?: string) => {
    if (!string) return
    Clipboard.setStringAsync(string)
    snack.info(`${key} copied to clipbloard!`)
  }
  useEffect(() => {
    if (item) setKeys(Object.keys(item).filter((k) => k.endsWith('Id')))
  }, [item])
  const createdAt = useMemo(() => {
    if (!item?.createdAt) return ''
    return new Date(item.createdAt).toLocaleString()
  }, [item?.createdAt])
  const updatedAt = useMemo(() => {
    if (!item?.updatedAt) return ''
    return new Date(item.updatedAt).toLocaleString()
  }, [item?.updatedAt])
  if (!debug) return null
  return (
    <Panel {...props}>
      <Text variant='titleMedium'>Debug</Text>
      <Text onPressIn={() => handleCopy('id', item?.id)}>ID: {item?.id}</Text>
      <Text disabled>Created At: {createdAt}</Text>
      <Text disabled>Updated At: {updatedAt}</Text>
      {keys.map((key) => (
        <Text key={key} onPressIn={() => handleCopy(key, item?.[key])} disabled>
          {keyString(key)}: {item?.[key]}
        </Text>
      ))}
    </Panel>
  )
}
