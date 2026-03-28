import { LayoutChangeEvent } from 'react-native'

export const logLayout = ({
  nativeEvent: {
    layout: { height, width }
  }
}: LayoutChangeEvent) => {
  console.log(`Layout changed: width=${width}, height=${height}`) // eslint-disable-line no-console
}
