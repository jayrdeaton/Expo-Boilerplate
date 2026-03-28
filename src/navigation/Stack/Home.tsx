import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../screens/HomeScreen'

const Stack = createStackNavigator()

const HomeStack = () => (
  <Stack.Navigator id='homeStack' screenOptions={{ headerShown: false }}>
    <Stack.Screen name='home' component={HomeScreen} />
  </Stack.Navigator>
)

export default HomeStack
