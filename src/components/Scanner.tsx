/**
 * Scanner
 *
 * Camera-based barcode scanner with animated overlays, optional auto-scan, sound/vibration
 * feedback, and a capture button with timeout. Requires camera permissions.
 *
 * Example:
 *   <Scanner onScan={(b) => handleScan(b)} />
 */
import { BarcodeScanningResult, BarcodeType, CameraView, useCameraPermissions } from 'expo-camera'

type Barcode = { value?: string; type?: BarcodeType }
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, StyleSheet, Vibration, View, ViewStyle } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

import { colors, icons } from '../constants'
import { useSettings } from '../hooks'

const sounds = { boop: () => {} }
import { isDarkColor } from '../utils'
import { IconButton } from './IconButton'
import { Scan, ScanNode } from './Scan'
import { Timer } from './Timer'

const DURATION = 250
const USE_NATIVE_DRIVER = false
const REMOVAL_DELAY = 500
const BUTTON_OPACITY_ACTIVE = 0.5
const BUTTON_OPACITY_INACTIVE = 1

/**
 * Props for {@link Scanner}.
 *
 * @property children - Optional React children rendered above camera overlay.
 * @property exclusions - Not currently used; reserved for excluding types.
 * @property onScan - Called with scanned barcode data on capture.
 * @property style - Optional style for the camera view.
 */
export type ScannerProps = {
  children?: ReactNode
  exclusions?: string[]
  onScan: (data: Partial<Barcode>) => void
  style?: ViewStyle
}

/**
 * On-device barcode scanner with animated overlays and capture button/timeout.
 *
 * @param props - {@link ScannerProps}
 */
export const Scanner = ({ children, onScan, style }: ScannerProps) => {
  const { cameraTimeout, scannerAuto, scannerTypes, sound, vibrate } = useSettings()
  // sounds stub
  const theme = useTheme()
  const [permission, requestPermission] = useCameraPermissions()
  const [camera, setCamera] = useState(false)
  const [cameraMounted, setCameraMounted] = useState(false)
  const opacity = useRef(new Animated.Value(0)).current
  const [timerStarted, setTimerStarted] = useState<string | undefined>()
  const animations = useRef<{ [key: string]: { check: Animated.Value; origin: Animated.ValueXY; height: Animated.Value; width: Animated.Value } }>({})
  const timers = useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({})
  const [views, setViews] = useState<{ [key: string]: ScanNode }>({})
  const checked = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (permission?.canAskAgain && !permission?.granted) requestPermission()
  }, [permission, requestPermission])

  useEffect(() => {
    if (camera) {
      setCameraMounted(true)
      Animated.timing(opacity, { useNativeDriver: USE_NATIVE_DRIVER, toValue: 1, duration: DURATION, delay: DURATION }).start()
    } else {
      Animated.timing(opacity, { useNativeDriver: USE_NATIVE_DRIVER, toValue: 0, duration: DURATION }).start(() => {
        setCameraMounted(false)
      })
    }
  }, [camera, opacity])

  const handlePressIn = useCallback(() => setTimerStarted(undefined), [])

  const removeFromView = useCallback((i: string) => {
    clearTimeout(timers.current[i])
    timers.current[i] = setTimeout(() => {
      const animation = animations.current[i]
      animation?.height.stopAnimation()
      animation?.width.stopAnimation()
      animation?.origin.stopAnimation()
      setViews((prevState) => {
        const { [i]: removed, ...rest } = prevState
        return removed ? rest : prevState
      })
    }, REMOVAL_DELAY)
  }, [])
  const handleScanPress = useCallback(
    async (scan: BarcodeScanningResult) => {
      if (!checked.current.has(scan.data)) {
        checked.current.add(scan.data)
        const check = animations.current[scan.data]?.check
        if (check) Animated.timing(check, { toValue: 1, duration: DURATION, useNativeDriver: USE_NATIVE_DRIVER }).start()
      }
      if (vibrate) Vibration.vibrate()
      if (sound) sounds.boop()
      onScan({ value: scan.data, type: scan.type.toUpperCase() as BarcodeType })
    },
    [vibrate, sound, sounds, onScan]
  )

  const handleScan = useCallback(
    (scan: BarcodeScanningResult) => {
      if (scannerAuto && !checked.current.has(scan.data)) handleScanPress(scan)
      const view = views[scan.data]
      const animation = animations.current[scan.data]
      if (view && animation) {
        Animated.parallel([Animated.spring(animation.origin, { toValue: { x: scan.bounds?.origin.x, y: scan.bounds?.origin.y }, useNativeDriver: USE_NATIVE_DRIVER }), Animated.spring(animation.height, { toValue: scan.bounds?.size.height, useNativeDriver: USE_NATIVE_DRIVER }), Animated.spring(animation.width, { toValue: scan.bounds?.size.width, useNativeDriver: USE_NATIVE_DRIVER })]).start()
      } else {
        const check = new Animated.Value(checked.current.has(scan.data) ? 1 : 0)
        const origin = new Animated.ValueXY({ x: scan.bounds?.origin.x, y: scan.bounds?.origin.y })
        const height = new Animated.Value(scan.bounds?.size.height)
        const width = new Animated.Value(scan.bounds?.size.width)
        animations.current[scan.data] = { check, origin, height, width }
        setViews((prev) => ({
          ...prev,
          [scan.data]: <Scan key={scan.data} color={theme.colors.primary} check={check} height={height} onPress={handleScanPress} origin={origin} scan={scan} width={width} />
        }))
      }
      removeFromView(scan.data)
    },
    [scannerAuto, views, theme.colors.primary, handleScanPress, removeFromView]
  )

  const handlePress = useCallback(() => {
    setCamera(true)
    setTimerStarted(new Date().toISOString())
    if (scannerAuto) return
    const data = Object.values(views).reduce((a: BarcodeScanningResult[], i) => a.concat(i.props.scan), [])
    for (const d of data) handleScanPress(d)
  }, [scannerAuto, views, handleScanPress])
  const handleStart = useCallback(() => setCamera(true), [])
  const handleStop = useCallback(() => setCamera(false), [])

  const iconColor = useMemo(() => (isDarkColor(theme.colors.primary) ? 'white' : 'rgba(0, 0, 0, .54)'), [theme.colors.primary])

  const buttonOpacity = useMemo(() => (scannerAuto && camera ? BUTTON_OPACITY_ACTIVE : BUTTON_OPACITY_INACTIVE), [scannerAuto, camera])

  useEffect(() => {
    const currentTimers = timers.current
    return () => {
      Object.values(currentTimers).forEach(clearTimeout)
    }
  }, [])

  return permission?.granted ? (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.transparent }]}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity, backgroundColor: colors.black }]}>
        <CameraView active={cameraMounted} facing='back' barcodeScannerSettings={{ barcodeTypes: scannerTypes }} onBarcodeScanned={handleScan} style={[StyleSheet.absoluteFill, style]} />
      </Animated.View>
      {children}
      {Object.values(views)}
      <View style={styles.buttons}>
        <Timer duration={cameraTimeout} radius={45} started={timerStarted} onStart={handleStart} onStop={handleStop} style={styles.capture}>
          <IconButton iconColor={iconColor} containerColor={theme.colors.primary} icon={camera ? icons.scanner : icons.wake} size={50} onPress={handlePress} onPressIn={handlePressIn} style={{ opacity: buttonOpacity }} />
        </Timer>
      </View>
    </View>
  ) : (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.transparent }]}>
      {permission?.granted === false && (
        <View style={[StyleSheet.absoluteFill, styles.permission]}>
          <Text variant='titleLarge'>Camera Permission Denied</Text>
        </View>
      )}
      {children}
    </View>
  )
}
const styles = StyleSheet.create({
  buttons: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 0,
    flexDirection: 'row',
    position: 'absolute'
  },
  capture: {
    margin: 20
  },
  permission: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
