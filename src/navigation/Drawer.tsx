import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView, DrawerItem, DrawerSection } from '../components'
import { icons } from '../constants'
import { useRoute, useSettings } from '../hooks'

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const { name, setName } = useRoute()
  const { debug } = useSettings()
  const insets = useSafeAreaInsets()
  const state = navigation.getState()
  const handlePress = (value: string) => navigation.navigate(value)

  useEffect(() => {
    const _name = state.routeNames[state.index]
    setName(_name)
  }, [setName, state.index, state.routeNames])

  return (
    <>
      <BlurView style={[styles.blur, { height: insets.top }]} />
      <ScrollView style={styles.scroll} contentInset={{ top: insets.top, bottom: insets.bottom }}>
        <DrawerSection title='App'>
          <DrawerItem icon={icons.home} focused={name === 'home'} title='Home' onPress={() => handlePress('home')} />
        </DrawerSection>
        {debug && (
          <DrawerSection title='Debug'>
            <DrawerItem icon={icons.info} focused={name === 'icons'} title='Icons' onPress={() => handlePress('notFound')} />
            <DrawerItem icon={icons.color} focused={name === 'palette'} title='Palette' onPress={() => handlePress('notFound')} />
          </DrawerSection>
        )}
      </ScrollView>
      <BlurView style={[styles.blur, styles.bottom, { height: insets.bottom }]} />
    </>
  )
}

const styles = StyleSheet.create({
  blur: { position: 'absolute', width: '100%', zIndex: 1 },
  bottom: { bottom: 0 },
  scroll: { height: '100%' }
})

export default DrawerContent
