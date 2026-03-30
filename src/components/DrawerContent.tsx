// Moved from src/navigation/Drawer.tsx
import { useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { icons } from '../constants'
import { useRoute, useSettings } from '../hooks'
import { BlurView, DrawerItem, DrawerSection } from '.'

const DrawerContent = () => {
  const { name, setName } = useRoute()
  const { debug } = useSettings()
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    const current = Array.isArray(segments) && segments.length > 0 ? segments[0] : 'home'
    setName(current)
  }, [setName, segments])

  const handlePress = (value: string) => {
    router.push(`/(drawer)/${value}`)
  }

  return (
    <>
      <BlurView style={[styles.blur, { height: insets.top }]} />
      <ScrollView style={styles.scroll} contentInset={{ top: insets.top, bottom: insets.bottom }}>
        <DrawerSection title='App'>
          <DrawerItem icon={icons.home} focused={name === 'home'} title='Home' onPress={() => handlePress('home')} />
        </DrawerSection>
        {debug && (
          <DrawerSection title='Debug'>
            <DrawerItem icon={icons.info} focused={name === 'icons'} title='Icons' onPress={() => handlePress('icons')} />
            <DrawerItem icon={icons.color} focused={name === 'palette'} title='Palette' onPress={() => handlePress('palette')} />
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
