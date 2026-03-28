import { randomUUID } from 'expo-crypto'

import { sqliteDb as db } from '../utils'

const navigationHistoryTable = {
  name: 'navigation_history',
  schema: 'id TEXT PRIMARY KEY, route TEXT NOT NULL, parent TEXT, params TEXT, visitCount INTEGER NOT NULL DEFAULT 1, lastVisitedAt INTEGER NOT NULL'
}

export type NavigationHistoryEntry = {
  id?: string
  route: string
  parent?: string | null
  params?: string | null
  visitCount?: number
  lastVisitedAt: number
}

type HistoryRow = {
  id: string
  route: string
  parent: string | null
  params: string | null
  visitCount: number
  lastVisitedAt: number
}

export const logVisit = async ({ route, parent, params, lastVisitedAt }: NavigationHistoryEntry) => {
  await db.ensureTable(navigationHistoryTable)
  const serializedParams = params ? JSON.stringify(params) : null

  // Check if this route combo exists
  const existing = await db.runSql<HistoryRow>('SELECT id FROM navigation_history WHERE route = ? AND parent IS ? AND params IS ?', [route, parent ?? null, serializedParams])

  if (existing.length > 0) {
    // Update: increment visitCount and update lastVisitedAt
    await db.runSql('UPDATE navigation_history SET visitCount = visitCount + 1, lastVisitedAt = ? WHERE route = ? AND parent IS ? AND params IS ?', [lastVisitedAt, route, parent ?? null, serializedParams])
  } else {
    // Insert: new route combo with visitCount = 1
    const id = randomUUID()
    await db.runSql('INSERT INTO navigation_history (id, route, parent, params, visitCount, lastVisitedAt) VALUES (?, ?, ?, ?, 1, ?)', [id, route, parent ?? null, serializedParams, lastVisitedAt])
  }
}

export const getRecentHistory = async (limit = 50): Promise<NavigationHistoryEntry[]> => {
  await db.ensureTable(navigationHistoryTable)
  const rows = await db.runSql<HistoryRow>('SELECT id, route, parent, params, visitCount, lastVisitedAt FROM navigation_history ORDER BY lastVisitedAt DESC LIMIT ?', [limit])
  return rows.map((row) => ({
    id: row.id,
    route: row.route,
    parent: row.parent,
    params: row.params ? safeParse(row.params) : undefined,
    visitCount: row.visitCount,
    lastVisitedAt: row.lastVisitedAt
  }))
}

export const pruneHistory = async (maxRows = 500) => {
  await db.ensureTable(navigationHistoryTable)
  await db.runSql('DELETE FROM navigation_history WHERE id NOT IN (SELECT id FROM navigation_history ORDER BY lastVisitedAt DESC LIMIT ?)', [maxRows])
}

const decayVisitCount = (visitCount: number, lastVisitedAt: number): number => {
  const daysSinceVisit = (Date.now() - lastVisitedAt) / (1000 * 60 * 60 * 24)
  // Decay by 50% every 7 days, with minimum of 1
  return Math.max(1, visitCount * Math.pow(0.5, daysSinceVisit / 7))
}

export const getFrequentlyVisited = async (limit = 10): Promise<(NavigationHistoryEntry & { effectiveVisitCount: number })[]> => {
  await db.ensureTable(navigationHistoryTable)
  const rows = await db.runSql<HistoryRow>('SELECT id, route, parent, params, visitCount, lastVisitedAt FROM navigation_history ORDER BY visitCount DESC LIMIT ?', [limit * 2])

  return rows
    .map((row) => ({
      id: row.id,
      route: row.route,
      parent: row.parent,
      params: row.params ? safeParse(row.params) : undefined,
      visitCount: row.visitCount,
      lastVisitedAt: row.lastVisitedAt,
      effectiveVisitCount: decayVisitCount(row.visitCount, row.lastVisitedAt)
    }))
    .sort((a, b) => b.effectiveVisitCount - a.effectiveVisitCount)
    .slice(0, limit)
}

const safeParse = (value: string) => {
  try {
    return JSON.parse(value)
  } catch {
    // eslint-disable-next-line no-console
    console.warn('Failed to parse history params')
    return undefined
  }
}
