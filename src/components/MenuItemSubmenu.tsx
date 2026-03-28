import { Children, cloneElement, type ReactNode, useState } from 'react'
import { GestureResponderEvent, View } from 'react-native'

import { Menu, MenuProps } from './Menu'
import { MenuItem, MenuItemProps } from './MenuItem'

export type MenuItemSubmenuProps = { autoDismiss?: boolean; children: ReactNode } & MenuItemProps & Omit<MenuProps, 'anchor' | 'visible'>

export const MenuItemSubmenu = ({ autoDismiss, caption, children, disabled, icon, iconColor, selected, title, variant, ...props }: MenuItemSubmenuProps) => {
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })
  const [menu, setMenu] = useState(false)
  const handleMenu = ({ nativeEvent: { pageX: x, pageY: y } }: GestureResponderEvent) => {
    setAnchor({ x, y })
    setMenu(!menu)
  }
  const handleMenuClose = () => setMenu(false)
  const reactChildren = Children.toArray(children)
  return (
    <View>
      <MenuItem caption={caption} disabled={disabled === true} icon={icon} iconColor={iconColor} onPress={handleMenu} selected={selected} title={title} variant={variant} />
      <Menu anchor={anchor} onDismiss={handleMenuClose} visible={menu} {...props}>
        {reactChildren.map((child) => cloneElement(child as React.ReactElement<{ onDismiss?: () => void }>, { onDismiss: autoDismiss ? handleMenuClose : undefined }))}
      </Menu>
    </View>
  )
}
