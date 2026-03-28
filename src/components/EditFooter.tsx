import { StyleSheet, View, ViewStyle } from 'react-native'
import { ProgressBar, useTheme } from 'react-native-paper'

import { Button } from './Button'
import { WrappingRow } from './WrappingRow'

export type EditFooterProps = {
  fetching: boolean
  onDelete?: () => void
  onSave: () => void
  progress?: number
  saving: boolean
  style?: ViewStyle
}

export const EditFooter = ({ fetching, onDelete, onSave, progress, saving, style }: EditFooterProps) => {
  const { colors } = useTheme()
  return (
    <View style={style}>
      <ProgressBar indeterminate={progress === undefined} progress={progress} visible={saving} />
      <WrappingRow style={styles.actions}>
        <Button textColor={colors.error} disabled={!onDelete || fetching || saving} icon='trash' onPress={onDelete} style={styles.button}>
          Delete
        </Button>
        <View style={styles.spacer} />
        <Button loading={fetching || saving} disabled={fetching || saving} icon='checkmark' onPress={onSave} style={styles.button}>
          Save
        </Button>
      </WrappingRow>
    </View>
  )
}
const styles = StyleSheet.create({
  actions: { justifyContent: 'space-between' },
  button: { flex: 1 },
  spacer: { flex: 1 }
})
