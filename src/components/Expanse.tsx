import { type ReactNode, useEffect, useRef } from 'react'
import { Animated, StyleSheet, ViewStyle } from 'react-native'

import { config } from '../constants'

const useNativeDriver = false

export type ExpanseProps = {
  animateInitialRender?: boolean
  animateIn?: boolean
  animateOut?: boolean
  children: ReactNode
  expanded: boolean
  height?: number
  style?: ViewStyle
  width?: number
}

export const Expanse = ({ animateInitialRender, animateIn, animateOut, children, expanded, height, style, width }: ExpanseProps) => {
  const expand = useRef(new Animated.Value(expanded && !animateInitialRender ? 1 : 0))
  const expandedRef = useRef(expanded)
  useEffect(() => {
    if (expanded !== expandedRef.current) {
      animateTo(expanded ? 1 : 0)
      expandedRef.current = expanded
    }
  }, [expanded]) // eslint-disable-line react-hooks/exhaustive-deps
  // constructor(props) {
  //   super(props)
  //   const { animateInitialRender, expanded } = props
  //   this.state = { expand: new Animated.Value(expanded && !animateInitialRender ? 1 : 0) }
  //   if (expanded && animateInitialRender) animateTo(1)
  // }
  // componentDidMount() {
  //   if (this.props.expanded) this.animateTo(1)
  // }
  // componentDidUpdate(prevProps) {
  //   const { expanded } = this.props
  //   if (expanded !== prevProps.expanded) this.animateTo(expanded ? 1 : 0)
  // }
  const animateTo = (num: number) => {
    if (num === 0 && animateIn === false) {
      expand.current = new Animated.Value(0)
      return
    }
    if (num === 1 && animateOut === false) {
      expand.current = new Animated.Value(1)
      return
    }
    Animated.timing(expand.current, {
      duration: config.animationDuration,
      useNativeDriver,
      toValue: num
    }).start()
  }
  return (
    <Animated.View
      style={[
        styles.root,
        height && {
          height: expand.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, height]
          })
        },
        width && {
          width: expand.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, width]
          })
        },
        style
      ]}
    >
      {children}
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  root: {
    overflow: 'hidden'
  }
})
