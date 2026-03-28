import { useState } from 'react'
import { GestureResponderEvent, View } from 'react-native'

import { icons } from '../constants'
import { useSettings } from '../hooks'
import { CameraTimeoutMenu } from './CameraTimeoutMenu'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'
import { MenuItemSubmenu } from './MenuItemSubmenu'

export type UtilityMenuProps = {
  disabled?: string[]
  hidden?: string[]
}

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

export const UtilityMenu = ({ disabled = [], hidden = [] }: UtilityMenuProps) => {
  const { cameraTimeout, scannerAuto, setScannerAuto, sound, setSound, vibrate, setVibrate } = useSettings()
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })
  const [scannerMenu, setScannerMenu] = useState(false)
  const handleScannerMenu = ({ nativeEvent: { pageX: x, pageY: y } }: GestureResponderEvent) => {
    setAnchor({ x, y })
    setScannerMenu(!scannerMenu)
  }
  return (
    <View>
      {!hidden.includes('Scanner') ? <MenuItem disabled={disabled.includes('Scanner')} icon={icons.qr} onPress={handleScannerMenu} title='Scanner' /> : null}
      <Menu anchor={anchor} onDismiss={() => setScannerMenu(false)} visible={scannerMenu}>
        <MenuItem icon={scannerAuto ? icons.autoScan : icons.manualScan} onPress={() => setScannerAuto(!scannerAuto)} title='Mode' caption={scannerAuto ? 'Auto' : 'Manual'} />
        <MenuItemSubmenu autoDismiss icon={icons.timeout} selected={cameraTimeout !== 0} title='Timeout' caption={timeoutString(cameraTimeout)}>
          <CameraTimeoutMenu />
        </MenuItemSubmenu>
        <MenuItem icon={sound ? icons.sound : icons.mute} onPress={() => setSound(!sound)} selected={sound} title='Sound' />
        <MenuItem icon={icons.vibrate} onPress={() => setVibrate(!vibrate)} selected={vibrate} title='Vibrate' />
      </Menu>
    </View>
  )
}
