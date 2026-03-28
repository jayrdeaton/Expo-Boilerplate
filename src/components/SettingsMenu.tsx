import { View } from 'react-native'

import { icons } from '../constants'
import { useSettings } from '../hooks'
import { MenuItem } from './MenuItem'

export type SettingsMenuProps = {
  disabled?: string[]
  hidden?: string[]
}

export const SettingsMenu = ({ hidden = [], disabled = [] }: SettingsMenuProps) => {
  const { blur, setBlur, debug, setDebug, headerLock, setHeaderLock, footerLock, setFooterLock, keepAwake, setKeepAwake } = useSettings()
  const handleBlur = () => setBlur(!blur)
  const handleDebug = () => setDebug(!debug)
  const handleHeaderLock = () => setHeaderLock(!headerLock)
  const handleFooterLock = () => setFooterLock(!footerLock)
  const handleKeepAwake = () => setKeepAwake(!keepAwake)
  return (
    <View>
      {!hidden?.includes('Blur') ? <MenuItem selected={blur} disabled={disabled?.includes('Blur') || false} onPress={handleBlur} title='Blur' icon={`${icons.blur}${!blur ? '-outline' : ''}`} /> : null}
      {!hidden?.includes('Debug') ? <MenuItem selected={debug} disabled={disabled?.includes('Debug') || false} onPress={handleDebug} title='Debug' icon={`${icons.debug}${!debug ? '-outline' : ''}`} /> : null}
      {!hidden?.includes('Header Lock') ? <MenuItem selected={headerLock} disabled={disabled?.includes('Header Lock') || false} onPress={handleHeaderLock} title='Header Lock' icon={`${icons.header}${!headerLock ? '-outline' : ''}`} /> : null}
      {!hidden?.includes('Footer Lock') ? <MenuItem selected={footerLock} disabled={disabled?.includes('Footer Lock') || false} onPress={handleFooterLock} title='Footer Lock' icon={`${icons.footer}${!footerLock ? '-outline' : ''}`} /> : null}
      {!hidden?.includes('Keep Awake') ? <MenuItem selected={keepAwake} disabled={disabled?.includes('Keep Awake') || false} onPress={handleKeepAwake} title='Keep Awake' icon={`${icons.keepAwake}${!keepAwake ? '-outline' : ''}`} /> : null}
    </View>
  )
}
