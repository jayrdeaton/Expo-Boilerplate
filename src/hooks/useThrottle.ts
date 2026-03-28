import { useCallback, useRef } from 'react'

export const useThrottle = () => {
  const throttling = useRef(false)
  const throttle = useCallback((func: () => unknown, delay: number) => {
    if (throttling.current) return
    throttling.current = true
    func()
    setTimeout(() => (throttling.current = false), delay)
  }, [])
  return throttle
}
