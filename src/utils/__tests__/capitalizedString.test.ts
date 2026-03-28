import { capitalizedString } from '../capitalizedString'
describe('capitalizedString', () => {
  it('should capitalize the first letter', () => {
    expect(capitalizedString('hello')).toBe('Hello')
  })
})
