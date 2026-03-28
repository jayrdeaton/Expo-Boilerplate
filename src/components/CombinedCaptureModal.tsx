import { BarcodeScanningResult, BarcodeType, CameraView, useCameraPermissions } from 'expo-camera'

type Barcode = { value?: string; type?: BarcodeType }
type Image = { id?: string; value?: string; blurhash?: string }
import { Image as ExpoImage } from 'expo-image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Pressable, StyleSheet, Text, Vibration, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { scheduleOnRN } from 'react-native-worklets'

import { colors as appColors, icons, layout } from '../constants'
import { useSettings, useTheme } from '../hooks'

const sounds = { boop: () => {} }
import { ActivityIndicator } from './ActivityIndicator'
import { Badge } from './Badge'
import { CameraMenu } from './CameraMenu'
import { Divider } from './Divider'
import { IconButton } from './IconButton'
import { MenuButton } from './MenuButton'
import { SafeAreaView } from './SafeAreaView'
import { Scan, ScanNode } from './Scan'
import { ScannerMenu } from './ScannerMenu'
import { SwipeableModal } from './SwipeableModal'
import { Timer } from './Timer'

const CAPTURE_OPTIONS = { exif: true, quality: 1, skipProcessing: true }
const DURATION = 250
const USE_NATIVE_DRIVER = false
const REMOVAL_DELAY = 500

type CaptureMode = 'photo' | 'scan'

export type CombinedCaptureModalProps = {
  visible: boolean
  onClose: () => void
  facing?: 'front' | 'back'
  onScan?: (data: Partial<Barcode>) => void
  onChange?: (images: Image[]) => void
  onImages?: (images: Image[]) => void
  initialMode?: CaptureMode
}

export const CombinedCaptureModal = ({ facing: propFacing = 'back', initialMode, onChange, onClose, onImages, onScan, visible }: CombinedCaptureModalProps) => {
  const { cameraTimeout, scannerAuto, scannerTypes, sound, vibrate } = useSettings()
  const sounds = { boop: () => {} }
  const [permission, requestPermission] = useCameraPermissions()
  const {
    theme: { colors }
  } = useTheme()

  const camera = useRef<CameraView | null>(null)
  const animations = useRef<{ [key: string]: { check: Animated.Value; origin: Animated.ValueXY; height: Animated.Value; width: Animated.Value } }>({})
  const timers = useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({})
  const checked = useRef<Set<string>>(new Set())

  const imageCallback = onImages ?? onChange
  const supportsPhoto = Boolean(imageCallback)
  const supportsScan = Boolean(onScan)
  const isHybrid = supportsPhoto && supportsScan

  const requestedMode = useMemo<CaptureMode>(() => {
    if (supportsPhoto && !supportsScan) return 'photo'
    if (supportsScan && !supportsPhoto) return 'scan'
    if (supportsPhoto && supportsScan) return initialMode === 'scan' || initialMode === 'photo' ? initialMode : 'photo'
    return 'photo'
  }, [initialMode, supportsPhoto, supportsScan])

  const [capturing, setCapturing] = useState<boolean>(false)
  const [facing, setFacing] = useState<'front' | 'back'>(propFacing)
  const [mode, setMode] = useState<CaptureMode>(requestedMode)
  const [photos, setPhotos] = useState<{ uri: string }[]>([])
  const [timerStarted, setTimerStarted] = useState<string | undefined>()
  const [torch, setTorch] = useState<boolean>(false)
  const [zoom, setZoom] = useState<number>(0)
  const [baseZoom, setBaseZoom] = useState<number>(0)
  const [views, setViews] = useState<{ [key: string]: ScanNode }>({})

  const clearTimers = useCallback(() => {
    Object.values(timers.current).forEach(clearTimeout)
    timers.current = {}
  }, [])

  const resetInternalState = useCallback(() => {
    clearTimers()
    setPhotos([])
    setViews({})
    checked.current.clear()
    animations.current = {}
    setTimerStarted(undefined)
    setCapturing(false)
  }, [clearTimers])

  const flushPhotos = useCallback(() => {
    if (!imageCallback) return
    const images = photos.map((photo): Image => ({ value: photo.uri }))
    imageCallback(images)
  }, [imageCallback, photos])

  const handleClose = useCallback(() => {
    flushPhotos()
    resetInternalState()
    onClose()
  }, [flushPhotos, onClose, resetInternalState])

  const removeFromView = useCallback((id: string) => {
    clearTimeout(timers.current[id])
    timers.current[id] = setTimeout(() => {
      const animation = animations.current[id]
      animation?.height.stopAnimation()
      animation?.width.stopAnimation()
      animation?.origin.stopAnimation()
      setViews((prevState) => {
        const { [id]: removed, ...rest } = prevState
        return removed ? rest : prevState
      })
    }, REMOVAL_DELAY)
  }, [])

  const handleScanPress = useCallback(
    async (scan: BarcodeScanningResult) => {
      if (mode !== 'scan' || !onScan) return
      if (!checked.current.has(scan.data)) {
        checked.current.add(scan.data)
        const check = animations.current[scan.data]?.check
        if (check) Animated.timing(check, { toValue: 1, duration: DURATION, useNativeDriver: USE_NATIVE_DRIVER }).start()
      }
      if (vibrate) Vibration.vibrate()
      if (sound) sounds.boop()
      onScan({ value: scan.data, type: scan.type.toUpperCase() as BarcodeType })
    },
    [mode, onScan, sound, sounds, vibrate]
  )

  const handleScan = useCallback(
    (scan: BarcodeScanningResult) => {
      if (mode !== 'scan' || !onScan) return
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
    [colors.primary, handleScanPress, mode, onScan, removeFromView, scannerAuto, views]
  )

  const handleCapture = useCallback(async () => {
    if (!supportsPhoto || !camera.current || capturing) return
    setCapturing(true)
    try {
      const data = await camera.current.takePictureAsync(CAPTURE_OPTIONS)
      setPhotos((prev) => [...prev, { uri: data.uri }])
    } finally {
      setCapturing(false)
    }
  }, [capturing, supportsPhoto])

  const handleManualScanSubmit = useCallback(async () => {
    if (mode !== 'scan' || !onScan || scannerAuto) return
    const data = Object.values(views).reduce((all: BarcodeScanningResult[], node) => all.concat(node.props.scan), [])
    for (const scan of data) await handleScanPress(scan)
  }, [handleScanPress, mode, onScan, scannerAuto, views])

  const handleAction = useCallback(async () => {
    if (mode === 'photo') {
      await handleCapture()
      return
    }
    await handleManualScanSubmit()
  }, [handleCapture, handleManualScanSubmit, mode])

  const handlePressIn = useCallback(() => setTimerStarted(undefined), [])

  const handlePressOut = useCallback(() => setTimerStarted(new Date().toISOString()), [])

  const handleTimerEnd = useCallback(() => {
    setTimerStarted(undefined)
    handleClose()
  }, [handleClose])

  const handleToggleMode = useCallback(() => {
    if (!isHybrid) return
    setMode((prev) => (prev === 'photo' ? 'scan' : 'photo'))
    setViews({})
  }, [isHybrid])

  useEffect(() => {
    setFacing(propFacing)
  }, [propFacing])

  useEffect(() => {
    setMode(requestedMode)
  }, [requestedMode])

  useEffect(() => {
    if (!visible) {
      resetInternalState()
      return
    }
    if (!permission?.granted && permission?.canAskAgain) requestPermission()
    setTimerStarted(new Date().toISOString())
  }, [permission?.canAskAgain, permission?.granted, requestPermission, resetInternalState, visible])

  useEffect(() => {
    return () => {
      resetInternalState()
    }
  }, [resetInternalState])

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

  if (!visible) return null

  return (
    <SwipeableModal visible={visible} onClose={handleClose}>
      <GestureDetector gesture={pinch}>
        <Pressable style={styles.container} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          {!permission?.granted ? (
            <View style={styles.permissionContainer}>
              <Text style={styles.permissionText}>Camera Permission Denied</Text>
            </View>
          ) : (
            <>
              <CameraView ref={camera} style={styles.camera} enableTorch={torch} facing={facing} zoom={zoom} barcodeScannerSettings={{ barcodeTypes: scannerTypes }} onBarcodeScanned={mode === 'scan' && onScan ? handleScan : undefined} />
              <SafeAreaView style={styles.overlay}>
                <View style={styles.header} pointerEvents='box-none'>
                  <IconButton iconColor={colors.primary} icon='close' onPress={handleClose} />
                  <MenuButton>
                    <CameraMenu facing={facing} onFacing={setFacing} onTorch={setTorch} torch={torch} />
                    {supportsScan && (
                      <>
                        <Divider />
                        <ScannerMenu />
                      </>
                    )}
                  </MenuButton>
                </View>

                {mode === 'scan' && Object.values(views)}

                <View style={styles.bottomBar} pointerEvents='box-none'>
                  <View style={styles.bottomLeft} pointerEvents='box-none'>
                    <View style={styles.stack} pointerEvents='box-none'>
                      {photos.length > 0 ? (
                        <>
                          <View style={styles.singleThumbWrap}>
                            <ExpoImage source={{ uri: photos[photos.length - 1].uri }} style={styles.thumb} />
                          </View>
                          <Badge style={styles.countBadge}>{photos.length}</Badge>
                          {capturing && (
                            <View style={styles.capturingIndicator}>
                              <ActivityIndicator size='small' />
                            </View>
                          )}
                        </>
                      ) : capturing ? (
                        <ActivityIndicator size='small' />
                      ) : null}
                    </View>
                  </View>

                  <View style={styles.bottomCenter} pointerEvents='box-none'>
                    {isHybrid && <IconButton testID='combined-capture-toggle' icon={mode === 'photo' ? icons.scan : icons.camera} iconColor='white' containerColor='rgba(0, 0, 0, 0.45)' onPress={handleToggleMode} style={styles.toggleButton} />}
                    <Timer duration={cameraTimeout} radius={41} started={timerStarted} onStop={handleTimerEnd}>
                      <IconButton testID='combined-capture-action' iconColor='white' icon='radio-button-on' size={82} onPress={handleAction} onPressIn={handlePressIn} onPressOut={handlePressOut} />
                    </Timer>
                  </View>

                  <View style={styles.bottomRight} pointerEvents='box-none' />
                </View>
              </SafeAreaView>
            </>
          )}
        </Pressable>
      </GestureDetector>
    </SwipeableModal>
  )
}

const styles = StyleSheet.create({
  bottomBar: { alignItems: 'center', bottom: 24, flexDirection: 'row', left: 0, paddingHorizontal: 12, position: 'absolute', right: 0 },
  bottomCenter: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  bottomLeft: { alignItems: 'flex-start', flex: 1, justifyContent: 'center', paddingLeft: 12 },
  bottomRight: { alignItems: 'flex-end', flex: 1, justifyContent: 'center', paddingRight: 12 },
  camera: { backgroundColor: appColors.black, bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  capturingIndicator: { alignItems: 'center', bottom: 0, justifyContent: 'center', left: 0, position: 'absolute', right: 0, top: 0 },
  container: { backgroundColor: appColors.black, flex: 1 },
  countBadge: { position: 'absolute', right: 0, top: 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 },
  overlay: { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  permissionContainer: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  permissionText: { color: appColors.white, fontSize: 20, fontWeight: '600' },
  singleThumbWrap: { borderRadius: 6, overflow: 'hidden' },
  stack: { alignItems: 'center', flexDirection: 'row', height: (layout.window.width / 5) * 1.5 + 8 },
  thumb: { borderRadius: 6, height: (layout.window.width / 5) * 1.5, width: layout.window.width / 5 },
  toggleButton: { marginBottom: 10 }
})
