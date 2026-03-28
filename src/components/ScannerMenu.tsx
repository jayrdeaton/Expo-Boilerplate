import { View } from 'react-native'

import { icons } from '../constants'
import { useSettings } from '../hooks'
import { Divider } from './Divider'
import { MenuProps } from './Menu'
import { MenuItem } from './MenuItem'
import { MenuItemSubmenu } from './MenuItemSubmenu'
import { ScannerTypesMenu } from './ScannerTypesMenu'

export type ScannerMenuProps = {
  disabled?: string[]
  hidden?: string[]
} & Omit<MenuProps, 'anchor' | 'children' | 'visible'>

export const ScannerMenu = ({ disabled = [], hidden = [] }: ScannerMenuProps) => {
  const { scannerAuto, setScannerAuto, scannerTypes, sound, setSound, vibrate, setVibrate } = useSettings()
  return (
    <View>
      {!hidden?.includes('Mode') ? <MenuItem disabled={disabled?.includes('Mode') || false} icon={scannerAuto ? icons.autoScan : icons.manualScan} onPress={() => setScannerAuto(!scannerAuto)} title='Mode' caption={scannerAuto ? 'Auto' : 'Manual'} /> : null}
      {!hidden?.includes('Types') ? (
        <MenuItemSubmenu icon={`${icons.scanner}${scannerTypes.length === 0 ? '-outline' : ''}`} selected={scannerTypes.length > 0} title='Types' caption={scannerTypes.length === 1 ? scannerTypes[0].toUpperCase() : `${scannerTypes.length} Types`}>
          <ScannerTypesMenu />
        </MenuItemSubmenu>
      ) : null}
      <Divider />
      {!hidden?.includes('Sound') ? <MenuItem icon={sound ? icons.sound : icons.mute} onPress={() => setSound(!sound)} selected={sound} title='Sound' /> : null}
      {!hidden?.includes('Vibrate') ? <MenuItem icon={icons.vibrate} onPress={() => setVibrate(!vibrate)} selected={vibrate} title='Vibrate' /> : null}
    </View>
  )
}
