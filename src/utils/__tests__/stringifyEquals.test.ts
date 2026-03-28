import { stringifyEquals } from '../stringifyEquals'
describe('stringifyEquals', () => {
  it('should compare stringified objects', () => {
    expect(stringifyEquals({ a: 1 }, { a: 1 })).toBe(true)
    expect(stringifyEquals({ a: 1 }, { a: 2 })).toBe(false)
  })
})
