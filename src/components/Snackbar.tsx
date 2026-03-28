import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { Portal, Snackbar as PaperSnackbar, SnackbarProps as PaperSnackbarProps, Text, useTheme } from 'react-native-paper'

import { mui, strings } from '../constants'
import { useSnack } from '../hooks'
import { Icon } from './Icon'
import { IconButton } from './IconButton'

const getColor = (level?: string) => {
  switch (level) {
    case strings.error:
      return mui.red[500]
    case strings.info:
      return mui.blue[500]
    case strings.success:
      return mui.green[500]
    case strings.warning:
    default:
      return mui.orange[500]
  }
}

const getIcon = (level?: string) => {
  switch (level) {
    case strings.error:
      return 'close-circle'
    case strings.info:
      return 'information-circle'
    case strings.success:
      return 'checkmark-circle'
    case strings.warning:
    default:
      return 'warning'
  }
}

export type Snack = {
  level: string
  message: string
}

export type SnackbarProps = Omit<PaperSnackbarProps, 'children' | 'visible' | 'onDismiss'> & {}

export const Snackbar = (props: SnackbarProps) => {
  const theme = useTheme()
  const { snack, clear } = useSnack()
  const [visible, setVisible] = useState(false)
  const snackRef = useRef<Snack>(null)
  useEffect(() => {
    if (snack) {
      snackRef.current = snack
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [snack])
  const handleDismiss = () => clear()
  const icon = getIcon(snackRef.current?.level)
  const color = getColor(snackRef.current?.level)
  return (
    <Portal>
      <PaperSnackbar {...props} duration={PaperSnackbar.DURATION_MEDIUM} visible={visible} onDismiss={handleDismiss} style={[styles.snackbar, { backgroundColor: theme.colors.surface }, props.style]}>
        <View style={styles.wrapper}>
          {icon ? <Icon name={icon} color={color} size={30} /> : null}
          <View style={styles.message}>
            <Text>{snackRef.current?.message}</Text>
          </View>
          <IconButton icon='close-circle-outline' onPress={handleDismiss} />
        </View>
      </PaperSnackbar>
    </Portal>
  )
}
const styles = StyleSheet.create({
  message: { flex: 1, marginLeft: 8 },
  snackbar: {},
  wrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    paddingTop: 6
  }
})
