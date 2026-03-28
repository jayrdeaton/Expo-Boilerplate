import { useState } from 'react'
import { LayoutChangeEvent, ViewStyle } from 'react-native'

import { Expanse } from './Expanse'
import { IconButton } from './IconButton'

export type ExpandableButtonProps = {
  buttonStyle?: ViewStyle
  expanded: boolean
  icon: string
  style?: ViewStyle
}

export const ExpandableButton = (props: ExpandableButtonProps) => {
  const [size, setSize] = useState(0)
  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout
    setSize(height)
  }
  const { buttonStyle, expanded, style } = props
  return (
    <Expanse expanded={!!(size && expanded)} width={size} style={style}>
      <IconButton {...props} onLayout={handleLayout} style={buttonStyle} />
    </Expanse>
  )
}
