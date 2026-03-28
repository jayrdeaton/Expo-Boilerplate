import { AppImage } from '../types'

export const getPrimaryImage = (images?: AppImage[] | null): AppImage | undefined => {
  return images?.[0]
}
