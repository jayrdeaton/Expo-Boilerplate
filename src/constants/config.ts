import { Dimensions } from 'react-native'

const height = Dimensions.get('window').height

export const config = {
  api: '',
  otaVersion: 1,
  animationDuration: 300,
  listEndThreshold: height / 2,
  requestLimit: 50,
  cacheLength: 10,
  imageTransition: 500
}
