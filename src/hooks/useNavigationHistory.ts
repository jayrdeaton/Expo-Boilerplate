import { useCallback, useState } from 'react'

export type NavigationHistoryItem = {
  id: string
  title?: string
  visitedAt: string
  visits: number
}

export const useNavigationItems = () => {
  const [items, setItems] = useState<NavigationHistoryItem[]>([])

  const initialize = useCallback(async () => {
    // Stub: implement navigation history persistence as needed
  }, [])

  return { initialize, items }
}
