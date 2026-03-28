import { Children, cloneElement, useState } from 'react'
import { useTheme } from 'react-native-paper'

import { icons } from '../constants'
import { IconButton } from './IconButton'
import { Menu, MenuProps } from './Menu'

export type MenuButtonProps = {
  autoDismiss?: boolean
  disabled?: boolean
} & Omit<MenuProps, 'anchor' | 'visible'>

export const MenuButton = ({ autoDismiss, children, disabled, ...props }: MenuButtonProps) => {
  const { colors } = useTheme()
  const [menu, setMenu] = useState(false)
  const handleMenu = () => setMenu(!menu)
  const reactChildren = Children.toArray(children)
  return (
    <Menu {...props} anchor={<IconButton disabled={disabled === true} icon={icons.menu} iconColor={colors.primary} onPress={handleMenu} />} onDismiss={handleMenu} visible={menu}>
      {reactChildren.map((child) => cloneElement(child as React.ReactElement<{ onDismiss?: () => void }>, { onDismiss: autoDismiss ? handleMenu : undefined }))}
    </Menu>
  )
}
