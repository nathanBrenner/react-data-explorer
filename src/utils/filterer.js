import { isEmpty, isPrimitive, type } from '../utils';

export default function filterer(data, options = { cacheResults: true }) {
  const cache = {};

  return function filererFn(query = '') {
    if (!options.cacheResults) {
      return find(data, query, options);
    }

    let subquery;

    if (!cache[query]) {
      for (let i = query.length - 1; i > 0; i -= 1) {
        subquery = query.substr(0, i);

        if (cache[subquery]) {
          cache[query] = find(cache[subquery], query, options);
          break;
        }
      }
    }

    if (!cache[query]) {
      cache[query] = find(data, query, options);
    }
    return cache[query];
  };
}

function find(data, query, options) {
  const t = type(data);
  let index;
  if (data.index) {
    index = data.index;
  }
  let found = Object.entries(data).reduce(function keysReducer(
    acc,
    [key, value],
  ) {
    let matches;
    if (key !== 'index') {
      if (isPrimitive(value)) {
        if (contains(query, key, options) || contains(query, value, options)) {
          acc[key] = value;
          acc.index = index;
        }
      } else {
        if (contains(query, key, options)) {
          acc[key] = value;
          acc.index = index;
        } else {
          matches = find(value, query, options);

          if (!isEmpty(matches)) {
            acc = { ...acc, ...pair(key, matches) };
          }
        }
      }
    }
    return acc;
  },
  {});

  if (t === 'Array') {
    found = Object.values(found);
  }
  return found;
}

function contains(query, string, options) {
  if (string) {
    let haystack = String(string);
    let needle = query;

    if (options.ignoreCase) {
      haystack = haystack.toLowerCase();
      needle = needle.toLowerCase();
    }

    return haystack.includes(needle);
  }
}

function pair(key, value) {
  const p = {};
  p[key] = value;
  return p;
}
