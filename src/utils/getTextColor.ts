import { themes } from '../constants'
import { isDarkColor } from './isDarkColor'

export const getTextColor = (color: string) => (isDarkColor(color) ? themes.light.colors.inverseOnSurface : themes.dark.colors.inverseOnSurface)

export default getTextColor
