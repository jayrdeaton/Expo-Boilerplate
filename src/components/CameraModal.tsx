/**
 * CameraModal
 *
 * Modal camera that allows taking multiple pictures before closing. Returns
 * images as Image objects via the onChange callback.
 */
import { CameraView } from 'expo-camera'

type Image = { id?: string; value?: string; blurhash?: string }
import { Image as ExpoImage } from 'expo-image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { scheduleOnRN } from 'react-native-worklets'

import { colors as appColors, layout } from '../constants'
import { useSettings, useTheme } from '../hooks'
import { ActivityIndicator } from './ActivityIndicator'
import { Badge } from './Badge'
import { CameraMenu } from './CameraMenu'
import { IconButton } from './IconButton'
import { MenuButton } from './MenuButton'
import { SafeAreaView } from './SafeAreaView'
import { SwipeableModal } from './SwipeableModal'
import { Timer } from './Timer'

export type CameraModalProps = {
  facing?: 'front' | 'back'
  visible: boolean
  onClose: () => void
  onChange: (images: Image[]) => void
}

const CAPTURE_OPTIONS = { exif: true, quality: 1, skipProcessing: true }

export const CameraModal = ({ facing: propFacing = 'back', visible, onClose, onChange }: CameraModalProps) => {
  const { cameraTimeout } = useSettings()
  const {
    theme: { colors }
  } = useTheme()
  const camera = useRef<CameraView | null>(null)
  const [capturing, setCapturing] = useState<boolean>(false)
  const [facing, setFacing] = useState<'front' | 'back'>(propFacing)
  const [photos, setPhotos] = useState<{ uri: string }[]>([])
  const [timerStarted, setTimerStarted] = useState<string | undefined>()
  const [torch, setTorch] = useState<boolean>(false)
  const [zoom, setZoom] = useState<number>(0)
  const [baseZoom, setBaseZoom] = useState<number>(0)

  const handleClose = useCallback(() => {
    const images = photos.map((p): Image => ({ value: p.uri }))
    onChange(images)
    onClose()
    setPhotos([])
  }, [photos, onChange, onClose])

  const handlePress = useCallback(async () => {
    if (!camera.current || capturing) return
    setCapturing(true)
    try {
      const data = await camera.current.takePictureAsync(CAPTURE_OPTIONS)
      setPhotos((p) => [...p, { uri: data.uri }])
    } finally {
      setCapturing(false)
    }
  }, [capturing])

  const handlePressIn = useCallback(() => setTimerStarted(undefined), [])

  const handlePressOut = useCallback(() => setTimerStarted(new Date().toISOString()), [])

  const handleTimerEnd = useCallback(() => {
    setTimerStarted(undefined)
    onClose()
  }, [onClose])

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

  if (!visible) return null

  return (
    <SwipeableModal visible={visible} onClose={handleClose}>
      <GestureDetector gesture={pinch}>
        <Pressable style={styles.container} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <CameraView ref={camera} style={styles.camera} enableTorch={torch} facing={facing} zoom={zoom} />
          <SafeAreaView style={styles.overlay}>
            <View style={styles.header} pointerEvents='box-none'>
              <IconButton iconColor={colors.primary} icon='close' onPress={handleClose} />
              <MenuButton>
                <CameraMenu facing={facing} onFacing={setFacing} onTorch={setTorch} torch={torch} />
              </MenuButton>
            </View>
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
                <Timer duration={cameraTimeout} radius={41} started={timerStarted} onStop={handleTimerEnd}>
                  <IconButton iconColor='white' icon='radio-button-on' size={82} onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut} />
                </Timer>
              </View>
              <View style={styles.bottomRight} pointerEvents='box-none' />
            </View>
          </SafeAreaView>
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
  container: { flex: 1 },
  countBadge: { position: 'absolute', right: 0, top: 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 },
  overlay: { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  singleThumbWrap: { borderRadius: 6, overflow: 'hidden' },
  stack: { alignItems: 'center', flexDirection: 'row', height: (layout.window.width / 5) * 1.5 + 8 },
  thumb: { borderRadius: 6, height: (layout.window.width / 5) * 1.5, width: layout.window.width / 5 }
})
