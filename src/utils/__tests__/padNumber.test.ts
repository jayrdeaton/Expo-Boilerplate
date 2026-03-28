import { padNumber } from '../padNumber'
describe('padNumber', () => {
  it('should pad number with zeros', () => {
    expect(padNumber(5, 3)).toBe('005')
  })
})
