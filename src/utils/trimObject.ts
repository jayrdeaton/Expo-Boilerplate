export const trimObject = (object: any) => {
  if (!object) return
  for (const key of Object.keys(object))
    if (typeof object[key] === 'string') {
      object[key] = object[key].trim()
    } else if (Array.isArray(object[key])) {
      object[key].map((i) => typeof i === 'object' && trimObject(i))
    } else if (typeof object[key] === 'object') {
      trimObject(object[key])
    }
}
export default trimObject
