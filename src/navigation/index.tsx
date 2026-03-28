import { createStackNavigator } from '@react-navigation/stack'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '../hooks'
import { RootParamList } from '../types'
import Navigator from './Navigator'

const Nav = createStackNavigator<RootParamList>()

const Root = () => {
  const { theme } = useTheme()
  return (
    <View style={StyleSheet.absoluteFill}>
      <Nav.Navigator
        id='root'
        initialRouteName='homeStack'
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          freezeOnBlur: true,
          cardStyle: { backgroundColor: theme.colors.background }
        }}
      >
        <Nav.Screen name='homeStack' component={Navigator} />
      </Nav.Navigator>
    </View>
  )
}

export default Root
