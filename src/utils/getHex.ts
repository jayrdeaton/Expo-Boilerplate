import { getRgb } from './getRgb'

export const getHex = (value: string): string | null => {
  const rgb = getRgb(value)
  if (!rgb) return null

  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  const hexString = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`

  // Include alpha if present
  if (rgb.a !== undefined) {
    return `${hexString}${toHex(rgb.a * 255)}`
  }

  return hexString
}

export default getHex
