/* eslint-env jest */
import isEmpty from './is-empty'

describe('isEmpty', () => {
  it('should return true', () => {
    expect(isEmpty({})).toBe(true)
  })
  it('should return true', () => {
    expect(isEmpty({ a: '' })).toBe(false)
  })
})
