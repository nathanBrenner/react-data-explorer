/* eslint-env jest */
import filterer from './filterer'

describe('filterer', () => {
  const filterFn = filterer([
    {
      latest_version: '4.13-beta-3',
      org: 'junit',
      name: 'junit',
      type: 'maven',
      package: 'jar',
      version: '4.13.1',
      scope: 'test',
      requirement: '4.13.1',
      file: 'pom.xml',
      dependencies: null,
      index: '.root.0',
    },
    {
      dependencies: null,
      file: 'package.json',
      latest_version: '2.1.4',
      name: 'benchmark',
      org: 'bestiejs',
      package: 'package',
      requirement: '1.x.x',
      scope: 'runtime',
      type: 'npmjs',
      version: '1.0.0',
      index: '.root.1',
    },
    {
      latest_version: '1.0.0-beta.5.2',
      org: 'szmarczak',
      name: 'http2-wrapper',
      type: 'npmjs',
      package: 'package',
      version: '1.0.0-beta.5.2',
      scope: 'runtime',
      requirement: '^1.0.0-beta.5.2',
      file: 'package.json',
      index: '.root.2',
      dependencies: [
        {
          latest_version: '5.1.1',
          org: 'sindresorhus',
          name: 'quick-lru',
          type: 'npmjs',
          package: 'package',
          version: '5.1.1',
          scope: 'runtime',
          requirement: '^5.1.1',
          file: '',
          dependencies: [],
          index: '.root.0.dependencies.0',
        },
      ],
    },
  ])

  it('returns a value', () => {
    expect(filterFn('mav')).toEqual([
      {
        type: 'maven',
        index: '.root.0',
      },
    ])
  })
  it('should return a value when the query results in a nested value', () => {
    expect(filterFn('quick')).toEqual([
      {
        dependencies: [{ index: '.root.0.dependencies.0', name: 'quick-lru' }],
      },
    ])
  })
})
