/**
 * Menu
 *
 * Wrapper around Paper Menu that applies a BlurView background for visual depth.
 *
 * Example:
 *   <Menu visible={open} onDismiss={close} anchor={<Button>Open</Button>}>
 *     <MenuItem title="Option 1" onPress={handle} />
 *   </Menu>
 */

import { StyleSheet } from 'react-native'
import { Menu as PaperMenu, MenuProps as PaperMenuProps } from 'react-native-paper'

import { colors } from '../constants'
import { BlurView } from './BlurView'

/**
 * Props for {@link Menu}.
 * Extends Paper Menu props directly.
 */
export type MenuProps = {} & PaperMenuProps

export const Menu = ({ children, ...props }: MenuProps) => {
  return (
    <PaperMenu {...props} key={props.visible.toString()} contentStyle={[styles.menu, props.contentStyle]}>
      <BlurView>{children}</BlurView>
    </PaperMenu>
  )
}
const styles = StyleSheet.create({
  menu: { backgroundColor: colors.transparent, paddingVertical: 0 }
})
