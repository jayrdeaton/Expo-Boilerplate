import * as Clipboard from 'expo-clipboard'
import { useEffect, useMemo, useState } from 'react'
import { ViewStyle } from 'react-native'

import { useSettings, useSnack } from '../hooks'
import { Generic } from '../types'
import { Surface } from './Surface'
import { TextInput } from './TextInput'

const keyString = (key: string): string => {
  return key.charAt(0).toUpperCase() + key.slice(1).replace('Id', ' ID')
}

export type DebugInputProps<T> = {
  item?: T
  style?: ViewStyle
}

export const DebugInput = <T extends Generic>({ item, style }: DebugInputProps<T>) => {
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
    <Surface style={style} title='Debug'>
      <TextInput value={item?.id} onPressIn={() => handleCopy('id', item?.id)} label='ID' disabled />
      <TextInput value={createdAt} label='Created At' disabled />
      <TextInput value={updatedAt} label='Updated At' disabled />
      {keys.map((key) => (
        <TextInput key={key} value={item?.[key]} onPressIn={() => handleCopy(key, item?.[key])} label={keyString(key)} disabled />
      ))}
    </Surface>
  )
}
