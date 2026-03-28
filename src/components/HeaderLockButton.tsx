import { useTheme } from 'react-native-paper'

import { icons } from '../constants'
import { useSettings } from '../hooks'
import { IconButton, IconButtonProps } from './IconButton'

export type HeaderLockButtonProps = Omit<IconButtonProps, 'icon'>

export const HeaderLockButton = (props: HeaderLockButtonProps) => {
  const { headerLock, setHeaderLock } = useSettings()
  const { colors } = useTheme()
  const handlePress = () => setHeaderLock(!headerLock)
  return <IconButton {...props} icon={`${icons.header}${headerLock ? '' : '-outline'}`} iconColor={headerLock ? colors.primary : undefined} onPress={handlePress} />
}
