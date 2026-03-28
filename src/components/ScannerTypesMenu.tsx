import { BarcodeType } from 'expo-camera'
import { View } from 'react-native'

import { icons } from '../constants'
import { useSettings } from '../hooks'
import { Divider } from './Divider'
import { MenuItem } from './MenuItem'

const scanTypes: BarcodeType[] = ['aztec', 'ean13', 'ean8', 'qr', 'pdf417', 'upc_e', 'datamatrix', 'code39', 'code93', 'itf14', 'codabar', 'code128', 'upc_a']

export type ScannerTypesMenuProps = {
  onDismiss?: () => void
}

export const ScannerTypesMenu = ({ onDismiss }: ScannerTypesMenuProps) => {
  const { scannerTypes, setScannerTypes } = useSettings()
  const handleScannerType = (type: 'all' | 'none' | BarcodeType) => {
    if (type === 'all') {
      setScannerTypes(scanTypes)
    } else if (type === 'none') {
      setScannerTypes([])
    } else if (scannerTypes.includes(type)) {
      setScannerTypes([...scannerTypes.filter((i) => i !== type)])
    } else {
      setScannerTypes(scannerTypes.concat(type))
    }
  }
  return (
    <View>
      {scanTypes.length !== scannerTypes.length ? <MenuItem icon={icons.add} onPress={() => handleScannerType('all')} title='ALL' /> : <MenuItem icon={icons.remove} onPress={() => handleScannerType('none')} title='CLEAR' />}
      <Divider />
      {scanTypes.map((i) => (
        <MenuItem key={i} onPress={() => handleScannerType(i)} onDismiss={onDismiss} selected={scannerTypes.includes(i)} title={i.toUpperCase()} />
      ))}
    </View>
  )
}
