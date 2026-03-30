import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const HomeScreen = () => (
  <View style={styles.container}>
    <Text variant='headlineLarge'>Home</Text>
    <Text variant='bodyMedium'>Welcome to your Expo boilerplate.</Text>
  </View>
)

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1, gap: 8, justifyContent: 'center' }
})

export default HomeScreen
