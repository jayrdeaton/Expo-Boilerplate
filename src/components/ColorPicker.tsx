/**
 * ColorPicker
 *
 * Full-featured color picker with panel, hue slider, swatches, and quick actions
 * for undo/randomize. Shown in a positioned menu.
 *
 * Example:
 *   <ColorPicker visible={open} anchor={coords} color={color} onPick={setColor} onClose={close} />
 */
import { useMemo, useState } from 'react'

const generateHexColor = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
import { StyleSheet } from 'react-native'
import { scheduleOnRN } from 'react-native-worklets'
import ReanimatedColorPicker, { HueSlider, Panel1, Swatches } from 'reanimated-color-picker'

import { icons, layout } from '../constants'
import { isDarkColor } from '../utils'
import { Button } from './Button'
import { IconButton } from './IconButton'
import { Menu } from './Menu'
import { Row } from './Row'

/**
 * Props for {@link ColorPicker}.
 *
 * @property anchor - Screen coordinates for menu placement.
 * @property color - Initial color to display.
 * @property onClose - Called when picker is dismissed.
 * @property onPick - Called with final chosen color hex string.
 * @property visible - Whether the picker menu is visible.
 */
export type ColorPickerProps = {
  anchor: { x: number; y: number }
  color: string
  onClose: () => void
  onPick: (color: string) => void
  visible: boolean
}

export const ColorPicker = ({ anchor, color: original, onClose, onPick, visible }: ColorPickerProps) => {
  const [color, setColor] = useState(original)
  const [random, setRandom] = useState<string>(generateHexColor())
  const handleComplete = ({ hex }: { hex: string }) => {
    'worklet'
    scheduleOnRN(setColor, hex)
  }
  const handleClose = () => {
    onPick(color)
    onClose()
  }
  const handlePrev = () => setColor(original)
  const handleRandom = () => {
    setColor(random)
    setRandom(generateHexColor())
  }
  // const originalTextColor = useMemo(() => (isDarkColor(original) ? 'white' : 'black'), [original])
  const randomTextColor = useMemo(() => (isDarkColor(random) ? 'white' : 'black'), [random])
  const textColor = useMemo(() => (isDarkColor(color) ? 'white' : 'black'), [color])
  return (
    <Menu anchor={{ x: layout.window.width - 25, y: anchor.y }} onDismiss={handleClose} visible={visible} contentStyle={styles.menu} style={styles.menu}>
      <ReanimatedColorPicker style={styles.picker} value={color} onComplete={handleComplete}>
        <Panel1 style={styles.panel} />
        <HueSlider style={styles.panel} />
        <Swatches style={styles.panel} />
      </ReanimatedColorPicker>
      <Row style={styles.row}>
        <IconButton icon={icons.random} iconColor={randomTextColor} onPress={handleRandom} style={[{ backgroundColor: random }, styles.margin]} />
        <Button mode='contained' icon={icons.undo} onPress={handlePrev} style={[styles.rowItem, styles.margin]}>
          Previous
        </Button>
        <Button mode='contained' buttonColor={color} icon={icons.checkmark} textColor={textColor} onPress={handleClose} style={[styles.rowItem, styles.margin]}>
          Select
        </Button>
      </Row>
    </Menu>
  )
}
const styles = StyleSheet.create({
  margin: { marginHorizontal: 4 },
  menu: { marginTop: 0, paddingTop: 0 },
  panel: { marginVertical: 4 },
  picker: { width: layout.window.width - 50 },
  row: { margin: 8 },
  rowItem: { flex: 1 }
})
