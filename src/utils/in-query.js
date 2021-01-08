import isPrimitive from './is-primitive';

export default function inQuery({ query, path }) {
  return function withData([key, value]) {
    if (!query || !isPrimitive(value) || key !== 'index') {
      return true;
    }
    return `${path}.${key}.${value}`.includes(query);
  };
}
