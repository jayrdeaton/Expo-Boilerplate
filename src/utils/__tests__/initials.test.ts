import { initials } from '../initials'
describe('initials', () => {
  it('should return initials', () => {
    expect(initials('John Doe')).toBe('JD')
  })
})
