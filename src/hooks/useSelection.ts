import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState, selectionActions } from '../store'

const selectionSelector = (state: RootState) => state.selection

export const useSelection = () => {
  const { containerId } = useSelector(selectionSelector)
  const dispatch = useDispatch()
  const setContainerId = useCallback((value: string | null) => dispatch(selectionActions.setContainerId(value)), [dispatch])
  return {
    containerId,
    setContainerId
  }
}
