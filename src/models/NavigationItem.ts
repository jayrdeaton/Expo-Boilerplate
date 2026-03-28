import { randomUUID } from 'expo-crypto'

import { AppImage } from '../types'

export class NavigationItem {
  id: string
  collection: string
  images: AppImage[]
  title: string
  visitedAt: string
  visits: number

  static readonly tableConfig = {
    name: 'navigation_items',
    schema: 'id TEXT PRIMARY KEY, collection TEXT, images TEXT, title TEXT, visitedAt TEXT NOT NULL, visits INTEGER DEFAULT 1'
  }

  constructor(data?: Omit<Partial<NavigationItem>, 'images'> & { images?: AppImage[] | string | null }) {
    this.id = data?.id ?? randomUUID()
    this.collection = data?.collection ?? null
    this.images = this.getImages(data?.images)
    this.title = data?.title ?? null
    this.visitedAt = data?.visitedAt ?? new Date().toISOString()
    this.visits = data?.visits ?? 1
  }

  private getImages(images?: AppImage[] | string | null): AppImage[] {
    if (Array.isArray(images)) return images
    if (typeof images !== 'string' || !images) return []
    try {
      const parsed = JSON.parse(images)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
}
