import { useEffect, useState } from 'react'
import { GestureResponderEvent, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

// Minimal stubs for icons, theme, and utils
const icons = { light: 'weather-sunny', color: 'palette' }
const useTheme = () => ({ theme: { dark: false } })
const isDarkColor = (color: string) => false
const capitalizedString = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '')

// Minimal Button, Divider, Surface, TextInput, Menu, MenuItem, ColorPicker, ImagesInput, DebugInput
const Button = (props: any) => (
  <Text onPress={props.onPress} style={[props.style, { color: props.textColor || 'blue' }]}>
    {props.children}
  </Text>
)
const Divider = () => <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 4 }} />
const Surface = ({ children, title }: any) => (
  <View style={{ marginVertical: 8 }}>
    <Text style={{ fontWeight: 'bold' }}>{title}</Text>
    {children}
  </View>
)
const TextInput = (props: any) => (
  <Text onPress={() => {}}>
    {props.label}: <Text>{props.value}</Text>
  </Text>
)
const Menu = ({ visible, children }: any) => (visible ? <View>{children}</View> : null)
const MenuItem = ({ onPress, selected, title }: any) => (
  <Text onPress={onPress} style={{ fontWeight: selected ? 'bold' : 'normal' }}>
    {title}
  </Text>
)
const ColorPicker = ({ visible, onPick, onClose }: any) =>
  visible ? (
    <Text
      onPress={() => {
        onPick('#2196f3')
        onClose()
      }}
    >
      Pick Blue
    </Text>
  ) : null
const ImagesInput = (props: any) => null
const DebugInput = (props: any) => null

export type UserFormProps = {
  item: any
  onChange: (patch: Partial<any>) => void
}

export function UserForm({ item, onChange }: UserFormProps) {
  const { theme } = useTheme()
  const [anchor, setAnchor] = useState({ x: 0, y: 0 })
  const [appearanceMenu, setAppearanceMenu] = useState(false)
  const [colorMenu, setColorMenu] = useState(false)
  const [form, setForm] = useState<any>(() => ({ ...(item || {}) }))

  useEffect(() => setForm({ ...(item || {}) }), [item])

  const update = (patch: Partial<any>) => {
    setForm((f: any) => ({ ...(f || {}), ...patch }))
    onChange(patch)
  }

  const handleThemeModeMenu = (e?: GestureResponderEvent) => {
    setAppearanceMenu(!appearanceMenu)
  }
  const handleThemeColorMenu = (e?: GestureResponderEvent) => {
    setColorMenu(!colorMenu)
  }
  const textColor = form?.themeColor && (isDarkColor(form.themeColor) ? 'white' : 'black')

  const handleImages = (value: any) => update({ images: value })
  const handleEmail = (value: string) => update({ email: value })
  const handleFirstName = (value: string) => update({ firstName: value })
  const handleMiddleName = (value: string) => update({ middleName: value })
  const handleLastName = (value: string) => update({ lastName: value })
  const handleThemeColor = (value: string) => {
    update({ themeColor: value })
    setColorMenu(false)
  }
  const handleThemeMode = (value: string) => {
    if (value === 'system') {
      setAppearanceMenu(false)
      return
    }
    update({ themeMode: value })
    setAppearanceMenu(false)
  }
  return (
    <View>
      <ColorPicker visible={colorMenu} onClose={handleThemeColorMenu} onPick={handleThemeColor} />
      <Menu visible={appearanceMenu}>
        <MenuItem onPress={() => handleThemeMode('system')} selected={form?.themeMode === 'system'} title='System' />
        <MenuItem onPress={() => handleThemeMode('light')} selected={form?.themeMode === 'light'} title='Light' />
        <MenuItem onPress={() => handleThemeMode('dark')} selected={form?.themeMode === 'dark'} title='Dark' />
      </Menu>
      <ImagesInput value={form?.images} onChange={handleImages} />
      <Surface title='User'>
        <TextInput value={form?.email} onChangeText={handleEmail} label='E-mail' />
        <Divider />
        <TextInput value={form?.firstName} onChangeText={handleFirstName} label='First Name' />
        <TextInput value={form?.middleName} onChangeText={handleMiddleName} label='Middle Name' />
        <TextInput value={form?.lastName} onChangeText={handleLastName} label='Last Name' />
      </Surface>
      <Surface title='Theme'>
        <View style={styles.row}>
          <Text style={styles.label}>Appearance</Text>
          <Button icon={theme.dark ? `${icons.light}-outline` : icons.light} onPress={handleThemeModeMenu} style={styles.flex}>
            {capitalizedString(form?.themeMode)}
          </Button>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Color</Text>
          <Button icon={icons.color} onPress={handleThemeColorMenu} textColor={textColor} style={[styles.flex, { backgroundColor: form?.themeColor }]}>
            {form?.themeColor}
          </Button>
        </View>
      </Surface>
      <DebugInput item={form} />
    </View>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  label: { flex: 1, marginLeft: 15 },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4
  }
})
