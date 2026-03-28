import { currencyString } from '../currencyString'
describe('currencyString', () => {
  it('should format number as currency', () => {
    expect(currencyString(1234.56)).toContain('$')
  })
})
