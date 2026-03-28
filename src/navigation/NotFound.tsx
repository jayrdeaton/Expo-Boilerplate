import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const NotFound = () => (
  <View style={styles.container}>
    <Text variant='headlineMedium'>Not Found</Text>
    <Text variant='bodyMedium'>This screen doesn't exist.</Text>
  </View>
)

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }
})

export default NotFound
