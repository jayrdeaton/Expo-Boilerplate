import { getHex } from './getHex'
import { getRgb } from './getRgb'

export interface TriadicPalette {
  primary: string
  secondary: string
  tertiary: string
}

/**
 * Generates a triadic color palette from a primary color.
 * Triadic colors are evenly spaced 120° apart on the color wheel.
 *
 * @param primaryColor - Hex, RGB, or RGBA color string
 * @returns Object with primary, secondary, and tertiary hex colors
 */
export function getTriadicPalette(primaryColor: string): TriadicPalette {
  const rgb = getRgb(primaryColor)
  if (!rgb) {
    throw new Error(`Invalid color format: ${primaryColor}`)
  }

  // Convert RGB to HSL
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  // Generate triadic colors by rotating hue by 120°
  const secondary = hslToHex(
    (h + 1 / 3) % 1, // Rotate 120°
    s,
    l
  )

  const tertiary = hslToHex(
    (h + 2 / 3) % 1, // Rotate 240°
    s,
    l
  )

  return {
    primary: getHex(primaryColor),
    secondary,
    tertiary
  }
}

/**
 * Convert HSL to Hex color
 * @param h - Hue (0-1)
 * @param s - Saturation (0-1)
 * @param l - Lightness (0-1)
 * @returns Hex color string
 */
function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1))
  const m = l - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (h < 1 / 6) {
    r = c
    g = x
    b = 0
  } else if (h < 2 / 6) {
    r = x
    g = c
    b = 0
  } else if (h < 3 / 6) {
    r = 0
    g = c
    b = x
  } else if (h < 4 / 6) {
    r = 0
    g = x
    b = c
  } else if (h < 5 / 6) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  const toHex = (value: number) => {
    const hex = Math.round((value + m) * 255).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
