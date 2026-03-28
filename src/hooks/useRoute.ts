import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState, routeActions } from '../store'

const selector = (state: RootState) => state.route

export const useRoute = () => {
  const { name } = useSelector(selector)
  const dispatch = useDispatch()
  const setName = useCallback((value: string) => dispatch(routeActions.setName(value)), [dispatch])
  return {
    name,
    setName
  }
}
