import { getRgb } from './getRgb'

export const isDarkColor = (value: string): boolean => {
  const rgb = getRgb(value)
  if (!rgb) return false

  const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255]

  // Apply gamma correction
  const [rs, gs, bs] = [r, g, b].map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)))

  // Calculate relative luminance (WCAG)
  const luminance = 0.2126 * rs + 0.7152 * gs + 0.0722 * bs

  return luminance < 0.5
}

export default isDarkColor
