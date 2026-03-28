import { isUuid } from '../isUuid'
describe('isUuid', () => {
  it('should validate UUID', () => {
    expect(isUuid('123e4567-e89b-12d3-a456-426614174000')).toBe(true)
    expect(isUuid('not-a-uuid')).toBe(false)
  })
})
