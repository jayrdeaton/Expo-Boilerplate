import { getHex } from './getHex'
import { getRgb } from './getRgb'

export const getComplementaryColor = (value: string): string => {
  const rgb = getRgb(value)
  if (!rgb) return value
  const hex = getHex(`rgb(${255 - rgb.r}, ${255 - rgb.g}, ${255 - rgb.b})`)
  return hex
}

export default getComplementaryColor
