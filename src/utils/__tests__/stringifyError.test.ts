import { stringifyError } from '../stringifyError'
describe('stringifyError', () => {
  it('should stringify error', () => {
    const err = new Error('fail')
    expect(stringifyError(err)).toContain('fail')
  })
})
