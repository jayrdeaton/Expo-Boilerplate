import { View } from 'react-native'

import { useSettings } from '../hooks'
import { MenuItem } from './MenuItem'

export type CameraTimeoutMenuProps = {
  onDismiss?: () => void
}

export const CameraTimeoutMenu = ({ onDismiss }: CameraTimeoutMenuProps) => {
  const { cameraTimeout, setCameraTimeout } = useSettings()
  return (
    <View>
      <MenuItem onPress={() => setCameraTimeout(0)} selected={cameraTimeout === 0} title='Never' onDismiss={onDismiss} />
      <MenuItem onPress={() => setCameraTimeout(5)} selected={cameraTimeout === 5} title='5 Seconds' onDismiss={onDismiss} />
      <MenuItem onPress={() => setCameraTimeout(15)} selected={cameraTimeout === 15} title='15 Seconds' onDismiss={onDismiss} />
      <MenuItem onPress={() => setCameraTimeout(30)} selected={cameraTimeout === 30} title='30 Seconds' onDismiss={onDismiss} />
      <MenuItem onPress={() => setCameraTimeout(60)} selected={cameraTimeout === 60} title='1 Minute' onDismiss={onDismiss} />
      <MenuItem onPress={() => setCameraTimeout(180)} selected={cameraTimeout === 180} title='3 Minutes' onDismiss={onDismiss} />
      <MenuItem onPress={() => setCameraTimeout(300)} selected={cameraTimeout === 300} title='5 Minutes' onDismiss={onDismiss} />
    </View>
  )
}
