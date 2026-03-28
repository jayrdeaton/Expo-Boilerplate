import { commaString } from '../commaString'
describe('commaString', () => {
  it('should format number with commas', () => {
    expect(commaString(1000)).toBe('1,000')
  })
})
