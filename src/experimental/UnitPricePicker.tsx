import React from 'react'
import { GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { Button, IconButton, NumberInput, Surface } from '../components'
import { colors, icons } from '../constants'

export interface UnitPricePickerProps {
  value: number
  onChange: (price: number) => void
  currency?: string
  defaults?: number[]
}

const clamp = (v: number) => Math.max(0, Number.isNaN(v) ? 0 : v)

export const UnitPricePicker: React.FC<UnitPricePickerProps> = ({ value, onChange, currency = '$', defaults = [1, 5, 10] }) => {
  const format = (n: number) => `${currency}${n.toFixed(2)}`

  const onPressDefault = (n: number) => (e?: GestureResponderEvent) => {
    onChange(clamp(n))
  }

  const changeBy = (delta: number) => () => {
    onChange(clamp(Number((value + delta).toFixed(2))))
  }

  const handleChangeNumber = (number: number) => {
    if (Number.isNaN(number)) {
      onChange(0)
    } else {
      onChange(clamp(number))
    }
  }

  return (
    <Surface style={styles.container}>
      <View style={styles.defaultsRow}>
        {defaults.map((d) => (
          <Button key={d} onPress={onPressDefault(d)} accessibilityLabel={`Set price to ${currency}${d}`}>
            {format(d)}
          </Button>
        ))}
        {/* {defaults.map((d) => (
          <Pressable key={d} style={({ pressed }) => [styles.defaultButton, pressed && styles.defaultButtonPressed, value === d && styles.defaultButtonActive]} onPress={onPressDefault(d)} accessibilityRole='button' accessibilityLabel={`Set price to ${currency}${d}`}>
            <Text style={styles.defaultButtonText}>{format(d)}</Text>
          </Pressable>
        ))} */}
      </View>

      <View style={styles.controlRow}>
        <IconButton style={styles.bigButton} onPress={changeBy(-1)} icon={icons.remove} />
        <View style={styles.valueBox}>
          <Text style={styles.valueText}>{format(value)}</Text>
          <NumberInput style={styles.input} placeholder='0.00' value={value} onChangeNumber={handleChangeNumber} accessible accessibilityLabel='Edit unit price' />
        </View>
        <IconButton style={styles.bigButton} onPress={changeBy(1)} icon={icons.add} />
      </View>
    </Surface>
  )
}

export default UnitPricePicker

const styles = StyleSheet.create({
  bigButton: {
    alignItems: 'center',
    borderRadius: 18,
    height: 72,
    justifyContent: 'center',
    marginHorizontal: 8,
    width: 72
  },
  container: {
    alignItems: 'stretch',
    padding: 16
  },
  controlRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  defaultButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 6,
    paddingVertical: 14
  },
  defaultButtonPressed: {
    opacity: 0.8
  },
  defaultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  input: {
    borderColor: '#ddd',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 18,
    minWidth: 120,
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  valueBox: {
    alignItems: 'center',
    flex: 1
  },
  valueText: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6
  }
})
