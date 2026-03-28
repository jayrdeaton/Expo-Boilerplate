import { createDrawerNavigator } from '@react-navigation/drawer'
import { StyleSheet, View } from 'react-native'
import { useLinking } from '../hooks'
import { DrawerParamList } from '../types'
import Drawer from './Drawer'
import NotFound from './NotFound'
import HomeStack from './Stack/Home'

const Nav = createDrawerNavigator<DrawerParamList>()

const Navigator = () => {
  useLinking()
  return (
    <View style={StyleSheet.absoluteFill}>
      <Nav.Navigator
        id='navigator'
        drawerContent={Drawer}
        initialRouteName='home'
        screenOptions={{ headerShown: false, freezeOnBlur: true }}
      >
        <Nav.Screen name='home' component={HomeStack} />
        <Nav.Screen name='notFound' component={NotFound} />
      </Nav.Navigator>
    </View>
  )
}

export default Navigator
