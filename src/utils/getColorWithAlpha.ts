import { getHex } from './getHex'
import { getRgb } from './getRgb'

/**
 * Accepts a color in various formats (hex, hexa, rgb, rgba) and applies or overwrites the alpha value.
 * Returns the result as a hex string with alpha (8 digits).
 *
 * @param color - Color string in hex (#FFF, #FFFFFF, #FFFFFFFF), rgb(255,255,255), or rgba(255,255,255,0.5) format
 * @param alpha - Alpha value (0-1 for opacity, 0-255 for 8-bit). If > 1, treated as 8-bit value
 * @returns Hex color string with alpha (e.g., #FFFFFFFF), or null if color is invalid
 *
 * @example
 * getColorWithAlpha('#FF0000', 0.5) // returns '#FF000080'
 * getColorWithAlpha('rgb(255,0,0)', 128) // returns '#FF000080'
 * getColorWithAlpha('rgba(255,0,0,1)', 0.25) // returns '#FF000040'
 */
export const getColorWithAlpha = (color: string, alpha: number): string | null => {
  const rgb = getRgb(color)
  if (!rgb) return null

  // Normalize alpha: if > 1.0, treat as 8-bit value (0-255), otherwise as opacity (0-1)
  let alphaValue: number
  if (alpha > 1.0) {
    // If > 1.0, treat as 8-bit value and clamp to 0-255, then convert to 0-1
    alphaValue = Math.max(0, Math.min(alpha, 255)) / 255
  } else {
    // Otherwise clamp to 0-1 range
    alphaValue = Math.max(0, Math.min(1, alpha))
  }

  // Create a new RGB object with the updated alpha
  const colorWithAlpha = {
    ...rgb,
    a: alphaValue
  }

  // Use getHex to convert back to hex string with alpha
  const result = getHex(`rgba(${colorWithAlpha.r},${colorWithAlpha.g},${colorWithAlpha.b},${colorWithAlpha.a})`)
  return result ? result.toUpperCase() : null
}
