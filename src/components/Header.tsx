import { type ReactNode } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { layout } from '../constants'
import { Divider } from './Divider'
import { MenuButton } from './MenuButton'
import { NavigationButton } from './NavigationButton'
import { Row } from './Row'
import { ScrollViewHeader } from './ScrollViewHeader'
import { SettingsMenu } from './SettingsMenu'
import { TextAndCaption } from './TextAndCaption'
import { Touchable } from './Touchable'

export type HeaderProps = {
  caption?: string | null
  children?: ReactNode
  LeftComponent?: ReactNode
  MenuItems?: ReactNode
  onPress?: (() => void) | undefined
  RightComponent?: ReactNode
  style?: ViewStyle
  title?: string | null
}

export const Header = ({ caption, children, LeftComponent, MenuItems, onPress, RightComponent, style, title }: HeaderProps) => {
  return (
    <ScrollViewHeader>
      <View style={[style, styles.wrapper]}>
        <Row style={[styles.header, styles.row]}>
          <View style={styles.center}>{LeftComponent || <NavigationButton />}</View>
          <Touchable onPress={onPress} style={styles.flex}>
            <TextAndCaption caption={caption} text={title} textStyle={styles.title} textVariant='titleLarge' />
          </Touchable>
          <View style={styles.center}>
            <Row>
              {RightComponent}
              <MenuButton>
                <SettingsMenu />
                {MenuItems && <Divider />}
                {MenuItems}
              </MenuButton>
            </Row>
          </View>
        </Row>
        {children}
      </View>
    </ScrollViewHeader>
  )
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  flex: { flex: 1 },
  header: { height: layout.headerHeight },
  row: { alignItems: 'center' },
  title: { fontWeight: 'bold' },
  wrapper: { width: layout.window.width, zIndex: 1 }
})
