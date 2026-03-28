/**
 * ScannerModal
 *
 * Modal camera that allows taking multiple pictures before closing. Returns
 * images as Image objects via the onChange callback.
 */
import { BarcodeScanningResult, BarcodeType, CameraView } from 'expo-camera'

type Barcode = { value?: string; type?: BarcodeType }
import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Modal, Pressable, StyleSheet, Vibration, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { Portal } from 'react-native-paper'
import { scheduleOnRN } from 'react-native-worklets'

import { colors as appColors } from '../constants'
import { useSettings, useTheme } from '../hooks'
import { CameraMenu } from './CameraMenu'
import { Divider } from './Divider'
import { IconButton } from './IconButton'
import { MenuButton } from './MenuButton'
import { SafeAreaView } from './SafeAreaView'
import { Scan, ScanNode } from './Scan'
import { ScannerMenu } from './ScannerMenu'
import { Snackbar } from './Snackbar'
import { Timer } from './Timer'

const DURATION = 250
const USE_NATIVE_DRIVER = false
const REMOVAL_DELAY = 500

export type ScannerModalProps = {
  visible: boolean
  onClose: () => void
  onScan: (data: Partial<Barcode>) => void
}

export const ScannerModal = ({ visible, onClose, onScan }: ScannerModalProps) => {
  const { cameraTimeout, scannerAuto, scannerTypes, sound, vibrate } = useSettings()
  const sounds = { boop: () => {} }
  const {
    theme: { colors }
  } = useTheme()
  const camera = useRef<CameraView | null>(null)
  const [facing, setFacing] = useState<'front' | 'back'>('back')
  const [timerStarted, setTimerStarted] = useState<string | undefined>()
  const [torch, setTorch] = useState<boolean>(false)
  const [zoom, setZoom] = useState<number>(0)
  const [baseZoom, setBaseZoom] = useState<number>(0)
  const animations = useRef<{ [key: string]: { check: Animated.Value; origin: Animated.ValueXY; height: Animated.Value; width: Animated.Value } }>({})
  const timers = useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({})
  const [views, setViews] = useState<{ [key: string]: ScanNode }>({})
  const checked = useRef<Set<string>>(new Set())

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

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
          [scan.data]: <Scan key={scan.data} color={colors.primary} check={check} height={height} onPress={handleScanPress} origin={origin} scan={scan} width={width} />
        }))
      }
      removeFromView(scan.data)
    },
    [scannerAuto, views, colors.primary, handleScanPress, removeFromView]
  )

  const handlePress = useCallback(async () => {
    if (scannerAuto) return
    const data = Object.values(views).reduce((a: BarcodeScanningResult[], i) => a.concat(i.props.scan), [])
    for (const d of data) handleScanPress(d)
  }, [handleScanPress, scannerAuto, views])

  const handlePressIn = useCallback(() => setTimerStarted(undefined), [])

  const handlePressOut = useCallback(() => setTimerStarted(new Date().toISOString()), [])

  const handleTimerEnd = useCallback(() => {
    setTimerStarted(undefined)
    onClose()
  }, [onClose])

  useEffect(() => {
    const currentTimers = timers.current
    return () => {
      Object.values(currentTimers).forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    if (visible) setTimerStarted(new Date().toISOString())
  }, [visible])

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      const scale = typeof e.scale === 'number' ? e.scale : 1
      const sensitivity = 0.2
      const delta = (scale - 1) * sensitivity
      const newZoom = Math.max(0, Math.min(1, baseZoom + delta))
      scheduleOnRN(setZoom, newZoom)
    })
    .onEnd(() => {
      scheduleOnRN(setBaseZoom, Number.isFinite(zoom) ? zoom : 0)
    })

  return (
    <Modal visible={visible}>
      <Portal.Host>
        <GestureDetector gesture={pinch}>
          <Pressable style={styles.container} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <CameraView ref={camera} barcodeScannerSettings={{ barcodeTypes: scannerTypes }} enableTorch={torch} facing={facing} onBarcodeScanned={handleScan} style={[StyleSheet.absoluteFill, styles.camera]} />
            <SafeAreaView style={styles.overlay}>
              <View style={styles.header} pointerEvents='box-none'>
                <IconButton iconColor={colors.primary} icon='close' onPress={handleClose} />
                <MenuButton>
                  <CameraMenu facing={facing} onFacing={setFacing} onTorch={setTorch} torch={torch} />
                  <Divider />
                  <ScannerMenu />
                </MenuButton>
              </View>
              {Object.values(views)}
              <View style={styles.bottomBar} pointerEvents='box-none'>
                <View style={styles.bottomLeft} pointerEvents='box-none' />
                <View style={styles.bottomCenter} pointerEvents='box-none'>
                  <Timer duration={cameraTimeout} radius={41} started={timerStarted} onStop={handleTimerEnd}>
                    <IconButton iconColor='white' icon='radio-button-on' size={82} onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut} />
                  </Timer>
                </View>
                <View style={styles.bottomRight} pointerEvents='box-none' />
              </View>
              <Snackbar wrapperStyle={styles.snackbar} />
            </SafeAreaView>
          </Pressable>
        </GestureDetector>
      </Portal.Host>
    </Modal>
  )
}

const styles = StyleSheet.create({
  bottomBar: { alignItems: 'center', bottom: 24, flexDirection: 'row', left: 0, paddingHorizontal: 12, position: 'absolute', right: 0 },
  bottomCenter: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  bottomLeft: { alignItems: 'flex-start', flex: 1, justifyContent: 'center', paddingLeft: 12 },
  bottomRight: { alignItems: 'flex-end', flex: 1, justifyContent: 'center', paddingRight: 12 },
  camera: { backgroundColor: appColors.black, bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 },
  overlay: { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  snackbar: { bottom: 80 }
})
