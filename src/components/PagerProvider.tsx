import { createContext, ReactNode, RefObject, useCallback, useMemo, useRef } from 'react'
import PagerView from 'react-native-pager-view'
import { SharedValue, useSharedValue } from 'react-native-reanimated'

import { useOptions } from '../hooks'

type PagerContextType = {
  initialPage: number
  pagerIndex: RefObject<number>
  pagerPosition: SharedValue<number>
  pagerRef: RefObject<PagerView>
  setPage: (page: number) => void
}

export const PagerContext = createContext<PagerContextType>({
  initialPage: 0,
  pagerIndex: { current: 0 },
  pagerPosition: null,
  pagerRef: null,
  setPage: () => {}
})

type PagerOptions = {
  initialPage: number
}

export type PagerProviderProps = {
  children: ReactNode
  screen?: string
}

export const PagerProvider = ({ children, screen }: PagerProviderProps) => {
  const { initialPage, setOptions } = useOptions<PagerOptions>(screen ? `${screen}Pager` : undefined, { initialPage: 0 })
  const pagerPosition = useSharedValue(initialPage)
  const pagerIndex = useRef(initialPage)
  const pagerRef = useRef<PagerView>(null)
  const setPage = useCallback(
    (page: number) => {
      setOptions({ initialPage: page })
      pagerIndex.current = page
    },
    [setOptions]
  )
  const contextValue = useMemo(() => ({ initialPage, pagerIndex, pagerPosition, pagerRef, setPage }), [initialPage, pagerPosition, setPage])
  return <PagerContext.Provider value={contextValue}>{children}</PagerContext.Provider>
}
