import { createContext, useMemo, useState } from 'react'
import { SharedValue, useSharedValue } from 'react-native-reanimated'

import { layout } from '../constants'

type ScrollViewContextType = {
  headerHeight: number
  setHeaderHeight: (h: number) => void
  footerHeight: number
  setFooterHeight: (h: number) => void
  scrollHeight: number
  scrollPosition: SharedValue<number>
  progress: number | null
  setProgress: (p: number | null) => void
  progressing: boolean
  setProgressing: (b: boolean) => void
}

export const ScrollViewContext = createContext<ScrollViewContextType>({
  headerHeight: 0,
  setHeaderHeight: () => {},
  footerHeight: 0,
  setFooterHeight: () => {},
  scrollHeight: layout.window.height,
  scrollPosition: null,
  progress: null,
  setProgress: () => {},
  progressing: false,
  setProgressing: () => {}
})

export const ScrollViewProvider = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [footerHeight, setFooterHeight] = useState(0)
  const [progress, setProgress] = useState<number | null>(null)
  const [progressing, setProgressing] = useState(false)
  const scrollHeight = useMemo(() => layout.window.height - (headerHeight || 0) - (footerHeight || 0), [headerHeight, footerHeight])
  const scrollPosition = useSharedValue(0)
  const contextValue = useMemo(() => ({ footerHeight, setFooterHeight, headerHeight, setHeaderHeight, scrollHeight, scrollPosition, progress, setProgress, progressing, setProgressing }), [footerHeight, headerHeight, scrollHeight, scrollPosition, progress, progressing])
  return <ScrollViewContext.Provider value={contextValue}>{children}</ScrollViewContext.Provider>
}
