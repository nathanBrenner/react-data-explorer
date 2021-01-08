export default function items(count, type = 'item') {
  return `${count} ${type}${count === 1 ? '' : 's'}`
}
