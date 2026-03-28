export class Sort {
  [key: string]: 1 | -1
  constructor(props: Sort) {
    Object.assign(this, props)
    Object.defineProperty(this, 'prepare', { enumerable: false })
  }
  static prepare = (sort: Sort): string => btoa(JSON.stringify(sort))
}
