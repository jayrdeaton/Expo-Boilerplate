// Moved from src/navigation/NotFound.tsx
import { StyleSheet, Text, View } from 'react-native'

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>404 - Not Found</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  text: { color: 'gray', fontSize: 24 }
})
