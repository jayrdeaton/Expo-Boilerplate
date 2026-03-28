import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useTheme } from 'react-native-paper'

import { StackParamList } from '../types'
import { IconButton, IconButtonProps } from './IconButton'

export type BackButtonProps = Omit<IconButtonProps, 'icon'>

export const BackButton = ({ onLongPress, onPress, ...props }: BackButtonProps) => {
  const { colors } = useTheme()
  const navigation = useNavigation<StackNavigationProp<StackParamList>>()
  const handlePress = () => navigation.goBack()
  const handleLongPress = () => navigation.popToTop()
  return <IconButton icon='arrow-back' iconColor={colors.primary} onPress={onPress || handlePress} onLongPress={onLongPress || (onPress ? undefined : handleLongPress)} {...props} />
}
