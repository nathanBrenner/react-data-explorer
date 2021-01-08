import md5omatic from 'md5-o-matic';
import isPrimitive from './is-primitive';
import type from './type';

export default function leafKey(key, value) {
  if (isPrimitive(value)) {
    const hash = md5omatic(String(value));
    return `${key}:${hash}`;
  } else {
    return `${key}[${type(value)}]`;
  }
}
