import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

type Layout = {
  borderRadius: number
  borderWidth: number
  buttonHeight: number
  fontSizes: {
    largest: number
    large: number
    medium: number
    small: number
    smallest: number
  }
  headerHeight: number
  isSmallDevice: boolean
  modalAnimation: 'none' | 'slide' | 'fade' | undefined
  opacity: number
  window: {
    width: number
    height: number
  }
}

export const layout: Layout = {
  borderRadius: 4,
  borderWidth: 1,
  buttonHeight: 40,
  fontSizes: {
    largest: 28,
    large: 22,
    medium: 18,
    small: 14,
    smallest: 12
  },
  headerHeight: 60,
  isSmallDevice: width < 375,
  modalAnimation: 'fade',
  opacity: 0.8,
  window: {
    width,
    height
  }
}
