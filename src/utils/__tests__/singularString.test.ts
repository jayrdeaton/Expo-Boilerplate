import { singularString } from '../singularString'
describe('singularString', () => {
  it('should convert to singular', () => {
    expect(singularString('apples')).toBe('apple')
  })
})
