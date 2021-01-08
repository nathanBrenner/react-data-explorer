/* eslint-env jest */
import items from './items'

describe('items', () => {
  it('should return plural', () => {
    expect(items(2)).toBe('2 items')
  })

  it('should return singular', () => {
    expect(items(1)).toBe('1 item')
  })
})
