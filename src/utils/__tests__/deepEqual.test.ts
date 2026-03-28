import { deepEqual } from '../deepEqual'

describe('deepEqual', () => {
  test('primitives equal vs not equal', () => {
    expect(deepEqual(1, 1)).toBe(true)
    expect(deepEqual('a', 'a')).toBe(true)
    expect(deepEqual(true, true)).toBe(true)
    expect(deepEqual(1, 2)).toBe(false)
    expect(deepEqual('a', 'b')).toBe(false)
    expect(deepEqual(true, false)).toBe(false)
  })

  test('null and undefined handling', () => {
    expect(deepEqual(null, null)).toBe(true)
    expect(deepEqual(undefined, undefined)).toBe(true)
    expect(deepEqual(null, undefined)).toBe(false)
    expect(deepEqual(undefined, null)).toBe(false)
  })

  test('arrays equal and order matters', () => {
    expect(deepEqual([], [])).toBe(true)
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(deepEqual([1, 2, 3], [3, 2, 1])).toBe(false)
    expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true)
    expect(deepEqual([1, [2, 3]], [1, [3, 2]])).toBe(false)
  })

  test('objects shallow and deep', () => {
    expect(deepEqual({}, {})).toBe(true)
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true)
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false)
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    expect(deepEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true)
    expect(deepEqual({ a: { b: 2 } }, { a: { b: 3 } })).toBe(false)
  })

  test('dates equality', () => {
    const d1 = new Date('2020-01-01T00:00:00.000Z')
    const d2 = new Date('2020-01-01T00:00:00.000Z')
    const d3 = new Date('2021-01-01T00:00:00.000Z')
    expect(deepEqual(d1, d2)).toBe(true)
    expect(deepEqual(d1, d3)).toBe(false)
    // Date vs string should be false
    expect(deepEqual(d1, '2020-01-01T00:00:00.000Z')).toBe(false)
  })

  test('different types not equal', () => {
    expect(deepEqual({}, [])).toBe(false)
    expect(deepEqual({ a: 1 }, 1)).toBe(false)
    expect(deepEqual([1, 2], '1,2')).toBe(false)
  })
})
