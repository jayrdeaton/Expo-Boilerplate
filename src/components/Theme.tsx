import { Provider } from '@rific/auto-paper'
import { type ReactNode } from 'react'
import { shallowEqual, useSelector } from 'react-redux'

import { RootState } from '@/redux/store'
import { addGate, clearGate } from '@/utils/splashGate'

addGate('theme')

const selector = (state: RootState) => state.theme

export type ThemeProps = {
  children: ReactNode
}

export const Theme = ({ children }: ThemeProps) => {
  const { appearance, color } = useSelector(selector, shallowEqual)
  return (
    <Provider appearance={appearance} color={color} onReady={() => clearGate('theme')}>
      {children}
    </Provider>
  )
}
