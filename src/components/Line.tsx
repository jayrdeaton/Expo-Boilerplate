import { StyleSheet, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import Svg, { Path } from 'react-native-svg'

export type LineProps = {
  style?: ViewStyle
}

export const Line = ({ style }: LineProps) => {
  const { colors } = useTheme()
  return (
    <Svg fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit='1.5' clipRule='evenodd' viewBox='0 0 2000 2000' style={[styles.line, style]}>
      <Path fill='none' stroke={colors.primary} strokeWidth='50.76' d='M0 0h2000' transform='matrix(.97 0 0 1 30 30)' />
    </Svg>
  )
}
const styles = StyleSheet.create({
  line: { position: 'absolute' }
})
