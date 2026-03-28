export class Filter {
  id?: string | null
  barcode?: string | null
  search?: string | null
  catalogId?: string | null
  containerId?: string | null
  productId?: string | null

  and?: Filter[]
  or?: Filter[]

  constructor(props?: Partial<Filter>) {
    Object.assign(this, props)
  }
  static prepare = (...filters: Filter[]): string => {
    const _filter: { $and?: any[] } = {}
    const and = []
    for (const filter of filters) {
      for (const k in filter) {
        if (k === 'search') {
          if (filter.search) and.push({ title: { $regex: `${new RegExp(filter.search, 'i')}` } })
        } else if (k === 'barcode' && filter.barcode) {
          and.push({ 'barcodes.value': filter.barcode })
        } else {
          and.push({ [k]: filter[k as keyof Filter] })
        }
      }
    }
    if (and.length) _filter.$and = and
    return btoa(JSON.stringify(_filter))
  }
  // private static build(filter: Filter): any {
  //   const conditions: any[] = []

  //   for (const k in filter) {
  //     const value = filter[k as keyof Filter]

  //     if (!value) continue

  //     if (k === 'and' && Array.isArray(value)) {
  //       return { $and: value.map(f => this.build(f)) }
  //     }

  //     if (k === 'or' && Array.isArray(value)) {
  //       return { $or: value.map(f => this.build(f)) }
  //     }

  //     if (k === 'search') {
  //       conditions.push({
  //         title: { $regex: new RegExp(value as string, 'i') }
  //       })
  //     } else if (k === 'barcode') {
  //       conditions.push({ 'barcodes.value': value })
  //     } else {
  //       conditions.push({ [k]: value })
  //     }
  //   }

  //   return conditions.length > 1 ? { $and: conditions } : conditions[0]
  // }

  // static prepare = (...filters: Filter[]): string => {
  //   const query =
  //     filters.length === 1
  //       ? this.build(filters[0])
  //       : { $and: filters.map(f => this.build(f)) }

  //   return btoa(JSON.stringify(query))
  // }
}
