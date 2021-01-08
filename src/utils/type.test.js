/* eslint-env jest */
import type from './type'

describe('type', () => {
  it('returns the type of the argument', () => {
    expect(type({})).toBe('Object')
    expect(type([])).toBe('Array')
    expect(type('')).toBe('String')
    expect(type(null)).toBe('Null')
    expect(type(4)).toBe('Number')
    expect(type(undefined)).toBe('Undefined')
    expect(type(true)).toBe('Boolean')
  })
})
