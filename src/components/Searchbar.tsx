import { memo, useCallback, useEffect, useState } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { Searchbar as PaperSearchbar, SearchbarProps as PaperSearchbarProps } from 'react-native-paper'

import { layout } from '../constants'
import { useSettings } from '../hooks'
import { Collapsible } from './Collapsible'

export type SearchbarProps = PaperSearchbarProps & { debounce?: boolean; style?: ViewStyle }

const SearchbarInner = ({ debounce, onChangeText, value: propValue, style, ...restProps }: SearchbarProps) => {
  const { search } = useSettings()
  const [value, setValue] = useState(propValue)
  const handleClear = useCallback(() => {
    setValue('')
    onChangeText?.('')
  }, [onChangeText])
  const handleSubmit = useCallback(() => {
    onChangeText?.(value)
  }, [onChangeText, value])
  useEffect(() => {
    if (debounce) {
      const timeout = setTimeout(() => onChangeText?.(value), 500)
      return () => clearTimeout(timeout)
    } else {
      onChangeText?.(value)
    }
  }, [debounce, onChangeText, value])
  return (
    <Collapsible style={style} visible={search}>
      <PaperSearchbar onClearIconPress={handleClear} onIconPress={handleSubmit} {...restProps} onSubmitEditing={handleSubmit} value={value} onChangeText={setValue} style={styles.input} />
    </Collapsible>
  )
}

const styles = StyleSheet.create({
  input: {
    // backgroundColor: 'transparent',
    borderRadius: layout.borderRadius,
    marginVertical: 2
  }
})

export const Searchbar = memo(SearchbarInner) as typeof SearchbarInner
