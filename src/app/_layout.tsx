import { Slot, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { enableScreens } from 'react-native-screens'

import { Providers } from '../components'
import { AuthProvider, useAuth } from '../components/AuthContext'

enableScreens(true)

function AuthRedirector() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated && router.pathname !== '/login') {
      router.replace('/login')
    }
    if (isAuthenticated && router.pathname === '/login') {
      router.replace('/(drawer)/home')
    }
  }, [isAuthenticated, router])
  return null
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Providers>
        <AuthRedirector />
        <Slot />
      </Providers>
    </AuthProvider>
  )
}
