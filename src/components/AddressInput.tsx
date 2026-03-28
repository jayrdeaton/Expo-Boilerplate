import { useEffect, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { Addressable } from '../types'
import { TextInput } from './TextInput'
import { WrappingRow } from './WrappingRow'

export type AddressInputProps<T> = {
  item?: T
  onChange: (value: Addressable) => void
  style?: ViewStyle
}

export const AddressInput = <T extends Addressable>({ item, onChange, style }: AddressInputProps<T>) => {
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  useEffect(() => {
    if (!item) return
    setAddress1(item.address1 || '')
    setAddress2(item.address2 || '')
    setCity(item.city || '')
    setState(item.state || '')
    setZip(item.zip || '')
  }, [item])
  useEffect(() => {
    onChange({ address1, address2, city, state, zip })
  }, [onChange, address1, address2, city, state, zip])
  const handleAddress1 = (value: string) => setAddress1(value)
  const handleAddress2 = (value: string) => setAddress2(value)
  const handleCity = (value: string) => setCity(value)
  const handleState = (value: string) => setState(value)
  const handleZip = (value: string) => setZip(value)
  return (
    <View style={style}>
      <WrappingRow>
        <TextInput label='Address 1' autoCapitalize='words' autoComplete='address-line1' onChangeText={handleAddress1} value={address1} />
      </WrappingRow>
      <WrappingRow>
        <TextInput label='Address 2' autoCapitalize='words' autoComplete='address-line2' onChangeText={handleAddress2} value={address2} />
      </WrappingRow>
      <WrappingRow>
        <TextInput label='City' autoCapitalize='words' autoComplete='postal-address-locality' onChangeText={handleCity} value={city} style={styles.city} />
        <TextInput label='State' autoCapitalize='words' autoComplete='postal-address-region' onChangeText={handleState} value={state} />
        <TextInput label='Zip' autoComplete='postal-code' keyboardType='number-pad' onChangeText={handleZip} value={zip} />
      </WrappingRow>
    </View>
  )
}
const styles = StyleSheet.create({
  city: { flex: 2.5 }
})
