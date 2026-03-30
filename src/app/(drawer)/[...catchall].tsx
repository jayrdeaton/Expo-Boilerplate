import { useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function CatchAll() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/not-found')
  }, [router])
  return null
}
