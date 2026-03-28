export const keyString = (key: string) => {
  if (!key) return key
  let string = ''
  key.split(/(?=[A-Z])/).map((s: string, i: number) => (string += `${i ? ' ' : ''}${s.charAt(0).toUpperCase() + s.slice(1)}`))
  return string
}

export default keyString
