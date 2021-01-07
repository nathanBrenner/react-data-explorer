/* eslint-env jest */
import inQuery from './in-query'

describe('inQuery', () => {
  it('should return a function', () => {
    expect(typeof inQuery({ query: 'm', path: '.root.0' })).toBe('function')
  })

  it('should return true when the field is in the query', () => {
    expect(
      inQuery({ query: 'm', path: '.root.0.name' })(['name', 'junit']),
    ).toBe(true)
  })
  it('should return true when the value is in the query', () => {
    expect(
      inQuery({ query: 'm', path: '.root.0.name.junit' })(['name', 'junit']),
    ).toBe(true)
  })

  it('should return true when the query is missing', () => {
    expect(
      inQuery({ query: '', path: '.root.0.name.junit' })(['name', 'junit']),
    ).toBe(true)
  })
  it('should return true when the data is an object or arry', () => {
    expect(
      inQuery({ query: '', path: '.root.0.name.junit' })(['dependencies', []]),
    ).toBe(true)
  })

  it('should return false when the query is not in the path', () => {
    expect(
      inQuery({ query: 'moov', path: '.root.0.name.junit' })([
        'dependencies',
        [],
      ]),
    ).toBe(true)
  })

  it('should return true on the root node', () => {
    expect(inQuery({ query: '', path: '' })(['.root.', null])).toBe(true)
  })
})
