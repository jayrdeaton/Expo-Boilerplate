import { type ReactNode, useCallback, useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import Svg, { Circle, G } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const useNativeDriver = true

export type TimerProps = {
  children: ReactNode
  duration: number
  onStart?: () => void
  onStop?: () => void
  radius: number
  started: string | null
  style?: ViewStyle
}

export const Timer = ({ children, duration, onStart, onStop, radius, started, style }: TimerProps) => {
  const { colors } = useTheme()
  const durationRef = useRef(duration)
  const strokeWidth = 6
  const circumference = 2 * Math.PI * radius
  const animation = useRef(new Animated.Value(0)).current
  const timer = useRef<ReturnType<typeof setTimeout>>(null)
  const animatedProps = {
    strokeDashoffset: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [circumference, circumference - (circumference * 100) / 100]
    })
  }
  const startTimer = useCallback(
    (callback?: () => void) => {
      clearTimeout(timer.current)
      if (onStart) onStart()
      if (onStop) timer.current = setTimeout(onStop, duration * 1000)
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: duration * 1000,
          easing: Easing.linear,
          useNativeDriver
        }),
        Animated.timing(animation, { toValue: 0, useNativeDriver })
      ]).start(callback)
    },
    [animation, duration, onStart, onStop]
  )
  const stopTimer = useCallback(
    (callback?: () => void) => {
      clearTimeout(timer.current)
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver
      }).start(callback)
    },
    [animation]
  )
  useEffect(() => {
    if (duration === 0) {
      stopTimer()
    } else if (duration !== durationRef.current && started) {
      stopTimer(() => startTimer())
    } else if (started) {
      stopTimer(() => startTimer())
    } else {
      stopTimer()
    }
    durationRef.current = duration
  }, [animation, duration, started, startTimer, stopTimer])
  return (
    <View style={[style, styles.root]}>
      <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth} viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`} style={styles.svg}>
        <G rotation='-90' origin={`${radius + strokeWidth / 2}, ${radius + strokeWidth / 2}`}>
          <AnimatedCircle cx={radius + strokeWidth / 2} cy={radius + strokeWidth / 2} r={radius} stroke={colors.primary} strokeWidth={strokeWidth} fill='none' strokeDasharray={circumference} {...animatedProps} />
        </G>
      </Svg>
      <View style={styles.children}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  children: {
    position: 'absolute'
  },
  root: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  svg: {
    // position: 'absolute'
  }
})
