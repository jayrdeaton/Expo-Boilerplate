import { useState } from 'react'
import { GestureResponderEvent, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { useSettings } from '../hooks'
import { timeoutString } from '../utils'
import { Button } from './Button'
import { CameraTimeoutMenu } from './CameraTimeoutMenu'
import { Menu } from './Menu'
import { Panel } from './Panel'
import { ScannerTypesMenu } from './ScannerTypesMenu'
import { Switch } from './Switch'

export const ScannerPanel = () => {
  const { cameraTimeout, scannerAuto, setScannerAuto, scannerTypes } = useSettings()
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })
  const [cameraTimeoutMenu, setCameraTimeoutMenu] = useState(false)
  const handleCameraTimeoutMenu = (e?: GestureResponderEvent) => {
    if (e?.nativeEvent) setAnchor({ x: e?.nativeEvent.pageX, y: e?.nativeEvent.pageY })
    setCameraTimeoutMenu(!cameraTimeoutMenu)
  }
  const [scannerTypesMenu, setScannerTypesMenu] = useState(false)
  const handleScannerTypesMenu = (e?: GestureResponderEvent) => {
    if (e?.nativeEvent) setAnchor({ x: e?.nativeEvent.pageX, y: e?.nativeEvent.pageY })
    setScannerTypesMenu(!scannerTypesMenu)
  }
  return (
    <View>
      <Menu visible={cameraTimeoutMenu} onDismiss={handleCameraTimeoutMenu} anchor={anchor}>
        <CameraTimeoutMenu onDismiss={handleCameraTimeoutMenu} />
      </Menu>
      <Menu visible={scannerTypesMenu} onDismiss={handleScannerTypesMenu} anchor={anchor}>
        <ScannerTypesMenu />
      </Menu>
      <Panel>
        <Text variant='titleLarge' style={styles.header}>
          Camera Scanner
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Auto Scan</Text>
          <View style={styles.center}>
            <Switch value={scannerAuto} onChange={setScannerAuto} />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Scan Types</Text>
          <Button compact onPress={handleScannerTypesMenu} style={styles.button}>
            {scannerTypes.length === 1 ? scannerTypes[0].toUpperCase() : `${scannerTypes.length} Types`}
          </Button>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Camera Timeout</Text>
          <Button compact onPress={handleCameraTimeoutMenu} style={styles.button}>
            {timeoutString(cameraTimeout)}
          </Button>
        </View>
      </Panel>
    </View>
  )
}

const styles = StyleSheet.create({
  button: { flex: 1 },
  center: { alignItems: 'center', flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', padding: 6, width: '100%' },
  label: { flex: 1, marginLeft: 15 },
  row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 4 }
})
