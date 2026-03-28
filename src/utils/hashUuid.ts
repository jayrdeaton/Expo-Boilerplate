export const hashUuid = (uuid?: string, length: number = 10) => {
  if (!uuid) return ''
  let hash = 0
  for (let i = 0; i < uuid.length; i++) {
    hash = (hash << 5) - hash + uuid.charCodeAt(i)
    hash |= 0 // force 32-bit
  }
  return Math.abs(hash).toString(36).slice(0, length)
}
