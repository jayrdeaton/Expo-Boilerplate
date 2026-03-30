import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { useAuth } from '../components/AuthContext'
import { UserForm } from '../components/UserForm'

// Minimal User type stub for demo
const mockUser = {
  email: '',
  firstName: '',
  middleName: '',
  lastName: '',
  themeColor: '#2196f3',
  themeMode: 'light',
  images: []
}

export default function LoginScreen() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { isAuthenticated, login, logout } = useAuth()

  // Mock login handler
  const handleLogin = async () => {
    setLoading(true)
    setError('')
    // Simulate API call
    setTimeout(() => {
      setUser({ ...mockUser })
      login()
      setLoading(false)
    }, 1000)
  }

  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text variant='titleLarge'>Welcome, {user?.firstName || 'User'}!</Text>
        <Button mode='contained' onPress={logout} style={styles.button}>
          Log out
        </Button>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <UserForm item={user} onChange={() => {}} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode='contained' onPress={handleLogin} loading={loading} style={styles.button}>
        Log in (Mock)
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  button: { marginTop: 24 },
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  error: { color: 'red', marginTop: 8 }
})
