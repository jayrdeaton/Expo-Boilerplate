import { Provider, themeActions, type ThemeSettings } from '@rific/auto-paper'
import { type ReactNode, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { type RootState } from '@/redux/store'
import { addGate, clearGate } from '@/utils/splashGate'

addGate('theme')

export type ThemeProps = {
  children: ReactNode
}

export const Theme = ({ children }: ThemeProps) => {
  const settings = useSelector((state: RootState) => state.theme, shallowEqual)
  const dispatch = useDispatch()
  const onChange = useCallback((s: ThemeSettings) => dispatch(themeActions.initialize(s)), [dispatch])
  return (
    <Provider overrides={settings} onChange={onChange} onReady={() => clearGate('theme')}>
      {children}
    </Provider>
  )
}
