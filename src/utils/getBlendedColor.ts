import { getHex } from './getHex'
import { getRgb } from './getRgb'

export const getBlendedColor = (foreground: string, background: string, alpha: number): string => {
  const fg = getRgb(foreground)
  const bg = getRgb(background)
  if (!fg || !bg) return background
  const safeAlpha = Math.min(1, Math.max(0, alpha))
  const r = Math.round(fg.r * safeAlpha + bg.r * (1 - safeAlpha))
  const g = Math.round(fg.g * safeAlpha + bg.g * (1 - safeAlpha))
  const b = Math.round(fg.b * safeAlpha + bg.b * (1 - safeAlpha))
  const hex = getHex(`rgb(${r}, ${g}, ${b})`)
  return hex
}

export default getBlendedColor
