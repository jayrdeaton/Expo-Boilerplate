import { View } from 'react-native'

import { icons } from '../constants'
import { useSettings } from '../hooks'
import { capitalizedString } from '../utils'
import { CameraTimeoutMenu } from './CameraTimeoutMenu'
import { MenuProps } from './Menu'
import { MenuItem } from './MenuItem'
import { MenuItemSubmenu } from './MenuItemSubmenu'

const timeoutString = (t: number) => {
  switch (t) {
    case 0:
      return 'Never'
    case 5:
      return '5 sec'
    case 15:
      return '15 sec'
    case 30:
      return '30 sec'
    case 60:
      return '1 min'
    case 180:
      return '3 min'
    case 300:
      return '5 min'
  }
}

export type CameraMenuProps = {
  disabled?: string[]
  facing?: 'front' | 'back'
  hidden?: string[]
  onFacing?: (value: 'front' | 'back') => void
  onTorch?: (value: boolean) => void
  torch?: boolean
} & Omit<MenuProps, 'anchor' | 'children' | 'visible'>

export const CameraMenu = ({ hidden = [], facing, disabled = [], onFacing, onTorch, torch }: CameraMenuProps) => {
  const { cameraTimeout } = useSettings()
  const handleFacing = () => onFacing && onFacing(facing === 'back' ? 'front' : 'back')
  const handleTorch = () => onTorch && onTorch(!torch)
  if (!onFacing || facing === undefined) hidden.push('Facing')
  if (!onTorch || torch === undefined) hidden.push('Torch')
  return (
    <View>
      {!hidden?.includes('Timeout') ? (
        <MenuItemSubmenu autoDismiss icon={`${icons.timeout}${cameraTimeout === 0 ? '-outline' : ''}`} selected={cameraTimeout !== 0} title='Timeout' caption={timeoutString(cameraTimeout)}>
          <CameraTimeoutMenu />
        </MenuItemSubmenu>
      ) : null}
      {!hidden?.includes('Torch') ? <MenuItem selected={torch} disabled={disabled?.includes('Torch') || false} onPress={handleTorch} title='Torch' icon={`${icons.torch}${!torch ? '-outline' : ''}`} /> : null}
      {!hidden?.includes('Facing') ? <MenuItem selected={facing === 'back'} disabled={disabled?.includes('Facing') || false} onPress={handleFacing} title='Facing' caption={capitalizedString(facing)} icon={`${icons.camera}${facing !== 'back' ? '-outline' : ''}`} /> : null}
    </View>
  )
}
