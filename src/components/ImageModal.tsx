/**
 * ImageModal
 *
 * Full-screen modal for viewing an image with pinch-to-zoom support and a close button.
 *
 * Example:
 *   <ImageModal image={uri} visible={open} onDismiss={() => setOpen(false)} />
 */
import { Modal, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { layout } from '../constants'
import { BlurView } from './BlurView'
import { IconButton } from './IconButton'
import { PinchableImage } from './PinchableImage'

/**
 * Props for {@link ImageModal}.
 *
 * @property image - Image URI to display.
 * @property onDismiss - Called when the user taps close.
 * @property visible - Whether the modal is visible.
 */
export type ImageModalProps = {
  image: string
  onDismiss: () => void
  visible: boolean
}

export const ImageModal = ({ image, onDismiss, visible }: ImageModalProps) => {
  const insets = useSafeAreaInsets()
  return (
    <Modal animationType={layout.modalAnimation} visible={visible} transparent>
      <BlurView style={StyleSheet.absoluteFill}>
        <PinchableImage image={image || ''} style={styles.image} />
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <IconButton icon='close' onPress={onDismiss} />
        </View>
      </BlurView>
    </Modal>
  )
}
const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-end',
    position: 'absolute',
    width: '100%'
  },
  image: {
    flex: 1,
    height: layout.window.width,
    width: layout.window.width
  }
})
