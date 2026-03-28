import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const HomeScreen = () => (
  <View style={styles.container}>
    <Text variant='headlineLarge'>Home</Text>
    <Text variant='bodyMedium'>Welcome to your Expo boilerplate.</Text>
  </View>
)

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }
})

export default HomeScreen
