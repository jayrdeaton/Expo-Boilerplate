export type AppImage = { id?: string; value?: string; blurhash?: string }

export type Generic = {
  catalogId?: string | null
  collection?: string | null
  containerId?: string | null
  createdAt: string | null
  id: string
  images?: AppImage[]
  productId?: string | null
  sku?: string | null
  title?: string | null
  unitId?: string | null
  updatedAt: string | null
}
