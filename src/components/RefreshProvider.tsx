import { createContext, useCallback, useMemo, useRef, useState } from 'react'

type RefreshContextType = {
  addJob: (p: Promise<unknown>) => void
  addJobs: (...ps: Promise<unknown>[]) => void
  refresh: () => void
  refreshing: boolean
  refreshKey: number
}

export const RefreshContext = createContext<RefreshContextType>({
  addJob: () => {},
  addJobs: () => {},
  refresh: () => {},
  refreshing: false,
  refreshKey: 0
})

export const RefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  // Keep a set of pending jobs (promises). Consumers call `addJob(promise)` to
  // register work that should be awaited during a refresh cycle.
  const jobsRef = useRef(new Set<Promise<unknown>>())

  const addJob = useCallback((p: Promise<unknown>) => {
    jobsRef.current.add(p)
    const cleanup = () => jobsRef.current.delete(p)
    p.then(cleanup, cleanup)
  }, [])
  const addJobs = useCallback(
    (...ps: Promise<unknown>[]) => {
      ps.forEach((p) => addJob(p))
    },
    [addJob]
  )
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    setRefreshKey((k) => k + 1)
    // Yield to the next animation frame so the native refresh spinner
    // can render immediately before we await jobs (prevents stutter).
    await new Promise((resolve) => requestAnimationFrame(resolve))
    // timeout(500)
    while (jobsRef.current.size > 0) {
      const jobs = Array.from(jobsRef.current)
      await Promise.allSettled(jobs)
    }
    setRefreshing(false)
  }, [])

  const contextValue = useMemo(() => ({ addJob, addJobs, refresh: handleRefresh, refreshing, refreshKey }), [addJob, addJobs, handleRefresh, refreshing, refreshKey])
  return <RefreshContext.Provider value={contextValue}>{children}</RefreshContext.Provider>
}
