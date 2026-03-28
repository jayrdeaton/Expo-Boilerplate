import { openDatabaseSync } from 'expo-sqlite'

export type DatabaseConfig = {
  name: string
}

export type TableConfig = {
  name: string
  schema: string
}

type SqlParams = (string | number | null)[]

type SqlRows<T> = {
  length: number
  item: (index: number) => T
}

type SqlResultSet<T> = {
  rows?: SqlRows<T>
}

type SqlTransaction = {
  executeSql: <T>(sql: string, params: SqlParams, success: (tx: SqlTransaction, result: SqlResultSet<T>) => void, error: (tx: SqlTransaction, error: unknown) => boolean) => void
}

type SqlDatabase = {
  transaction: (transaction: (tx: SqlTransaction) => void, error: (error: unknown) => void) => void
}

/**
 * SQLite database manager for the app.
 * Provides a single persistent connection and utilities for working with tables.
 */
export class Database {
  private db: SqlDatabase
  private initialized = new Map<string, Promise<void>>()

  constructor(config: DatabaseConfig) {
    this.db = openDatabaseSync(config.name) as unknown as SqlDatabase
  }

  /**
   * Ensure a table exists, creating it if necessary.
   * Memoizes the creation promise per table name to avoid race conditions.
   */
  async ensureTable(config: TableConfig): Promise<void> {
    if (this.initialized.has(config.name)) {
      return this.initialized.get(config.name)!
    }

    const promise = (async () => {
      await this.runSql(`CREATE TABLE IF NOT EXISTS ${config.name} (${config.schema})`)
    })()
    this.initialized.set(config.name, promise)
    return promise
  }

  /**
   * Drop and recreate a table according to the provided config.
   * Use when you don't need to preserve existing data.
   */
  async resetTable(config: TableConfig): Promise<void> {
    await this.runSql(`DROP TABLE IF EXISTS ${config.name}`)
    // clear any memoized initialization promise so ensureTable will recreate
    this.initialized.delete(config.name)
    await this.ensureTable(config)
  }

  /**
   * Run a SQL query and return typed results.
   */
  async runSql<T = Record<string, unknown>>(sql: string, params: SqlParams = []): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(
            sql,
            params,
            (_tx, result) => {
              const rows: T[] = []
              const len = result.rows?.length ?? 0
              for (let i = 0; i < len; i++) {
                rows.push(result.rows.item(i) as T)
              }
              resolve(rows)
            },
            (_tx, error) => {
              reject(error)
              return false
            }
          )
        },
        (txError) => {
          reject(txError)
        }
      )
    })
  }
}

// Singleton instance
export const sqliteDb = new Database({ name: 'cashierfu.db' })
