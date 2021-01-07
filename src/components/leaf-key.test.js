/* eslint-env jest */
import leafKey from './leaf-key'

describe('leafKey', () => {
  it('should return a unique key', () => {
    expect(leafKey('a', [])).toBe('a[Array]')
  })
})
