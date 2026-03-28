import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { optionsActions, RootState } from '../store'

const selector = (state: RootState) => state.options

export const useOptions = <T extends object>(screen?: string, defaults: T = {} as T) => {
  const state = useSelector(selector)
  const dispatch = useDispatch()
  const [options, setOptions] = useState<T>((screen && (state[screen] as T)) || defaults)
  const set = useCallback(
    (updates: Partial<T>) => {
      const _options = Object.assign({}, options, updates)
      setOptions(_options)
      if (screen) {
        const _state = Object.assign({}, state, { [screen]: _options })
        dispatch(optionsActions.setOptions(_state))
      }
    },
    [dispatch, options, screen, state]
  )
  useEffect(() => {
    if (!screen) return
    const _options = Object.assign(defaults, state[screen] || {})
    setOptions(_options)
  }, [screen, state]) // eslint-disable-line react-hooks/exhaustive-deps
  return { ...options, setOptions: set }
}
