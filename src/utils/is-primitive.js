import type from './type';

export default function isPrimitive(value) {
  const t = type(value);
  return t !== 'Object' && t !== 'Array';
}
