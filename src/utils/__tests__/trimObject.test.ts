import { trimObject } from '../trimObject'
describe('trimObject', () => {
  it('should trim object values', () => {
    const obj = { a: ' x ' }
    trimObject(obj)
    expect(obj).toEqual({ a: 'x' })
  })
})
