export const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true
  if (a == null || b == null) return false

  const isDate = (v: unknown): v is Date => v instanceof Date
  const isArray = (v: unknown): v is unknown[] => Array.isArray(v)
  const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && !isArray(v) && !isDate(v)

  // Dates
  if (isDate(a) || isDate(b)) {
    return isDate(a) && isDate(b) && a.getTime() === b.getTime()
  }

  // Arrays
  if (isArray(a) || isArray(b)) {
    if (!isArray(a) || !isArray(b)) return false
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }

  // Non-object primitives
  if (!isObject(a) || !isObject(b)) return false

  // Objects
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) return false
  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false
    if (!deepEqual(a[key], b[key])) return false
  }
  return true
}

export default deepEqual
