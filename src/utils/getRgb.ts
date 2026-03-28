import { colors } from '../constants'

type RGB = {
  r: number
  g: number
  b: number
  a?: number
}

export const getRgb = (value: string): RGB | null => {
  if (!value) return null

  let trimmed = value.trim().toLowerCase()

  // Check if it's a named color first
  const namedColor = colors[trimmed]
  if (namedColor) trimmed = namedColor

  // Try hex format (with or without #, 3/6/8 digits)
  const hexMatch = trimmed.match(/^#?([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i)

  if (hexMatch) {
    const hex = hexMatch[1]
    let normalized = hex

    // Expand 3-digit to 6-digit
    if (hex.length === 3) {
      normalized = hex
        .split('')
        .map((c) => c + c)
        .join('')
    }
    // Extract alpha from 8-digit (last 2 chars are alpha)
    else if (hex.length === 8) {
      const alpha = parseInt(hex.substring(6, 8), 16)
      normalized = hex.substring(0, 6)
      const intVal = parseInt(normalized, 16)
      return {
        r: (intVal >> 16) & 255,
        g: (intVal >> 8) & 255,
        b: intVal & 255,
        a: alpha / 255
      }
    }

    const intVal = parseInt(normalized, 16)
    return {
      r: (intVal >> 16) & 255,
      g: (intVal >> 8) & 255,
      b: intVal & 255
    }
  }

  // Try rgb/rgba format
  const rgbMatch = trimmed.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([0-9.]+))?\s*\)$/i)
  if (rgbMatch) {
    const result: RGB = {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3])
    }
    if (rgbMatch[4] !== undefined) {
      result.a = Number(rgbMatch[4])
    }
    return result
  }

  return null
}

export default getRgb
