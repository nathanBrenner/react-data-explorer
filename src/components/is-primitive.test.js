/* eslint-env jest */
import isPrimitive from './is-primitive'

describe('isPrimitive', () => {
  it('should return true', () => {
    expect(isPrimitive('')).toBe(true)
    expect(isPrimitive(true)).toBe(true)
    expect(isPrimitive(1)).toBe(true)
    expect(isPrimitive()).toBe(true)
  })
  it('should return false', () => {
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive([])).toBe(false)
  })
})
