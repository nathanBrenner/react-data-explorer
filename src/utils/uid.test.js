/* eslint-env jest */
import uid from './uid'

describe('uid', () => {
  let id
  beforeAll(() => {
    id = uid()
  })
  it('should generate a random number', () => {
    expect(typeof id).toBe('number')
  })

  it('should return the next number', () => {
    expect(uid()).toBe(++id)
  })
})
