import { StyleSheet } from 'react-native'
import { Divider as PaperDivider, DividerProps as PaperDividerProps } from 'react-native-paper'

export type DividerProps = {} & PaperDividerProps

export const Divider = (props: DividerProps) => <PaperDivider {...props} style={[styles.divider, props.style]} />

const styles = StyleSheet.create({
  divider: {
    marginBottom: 2,
    marginTop: 8,
    width: '100%'
  }
})
