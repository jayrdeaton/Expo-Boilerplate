import { createContext, useMemo } from 'react'
import { useSharedValue } from 'react-native-reanimated'

export const AnimationContext = createContext(null)

export const AnimationProvider = ({ children }) => {
  const sharedValue = useSharedValue(0)
  const contextValue = useMemo(() => ({ sharedValue }), [sharedValue])
  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>
}
