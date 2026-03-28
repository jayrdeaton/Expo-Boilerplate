import { useTheme } from 'react-native-paper'

import { icons } from '../constants'
import { useSettings } from '../hooks'
import { IconButton, IconButtonProps } from './IconButton'

export type PaginateButtonProps = Omit<IconButtonProps, 'icon'>

export const PaginateButton = (props: PaginateButtonProps) => {
  const { paginate, setPaginate } = useSettings()
  const { colors } = useTheme()
  const handlePress = () => setPaginate(!paginate)
  return <IconButton {...props} icon={`${icons.paginate}${paginate ? '' : '-outline'}`} iconColor={paginate ? colors.primary : undefined} onPress={handlePress} />
}
