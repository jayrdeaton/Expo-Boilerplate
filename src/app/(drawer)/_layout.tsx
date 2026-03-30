import { Drawer } from 'expo-router/drawer'

// DrawerContent implementation should be moved to a new location, e.g. src/components/DrawerContent
import DrawerContent from '../../components/DrawerContent'

export default function DrawerLayout() {
  return <Drawer drawerContent={DrawerContent} screenOptions={{ headerShown: false }} />
}
