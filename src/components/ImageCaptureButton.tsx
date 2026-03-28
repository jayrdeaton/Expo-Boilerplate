import { useEffect, useState } from 'react'

type AppImage = { id?: string; value?: string; blurhash?: string }

import { CameraModal } from './CameraModal'
import { IconButton, IconButtonProps } from './IconButton'

export type ImageCaptureButtonProps = { autoOpen?: boolean; facing?: 'front' | 'back'; onChange: (images: AppImage[]) => void } & Omit<IconButtonProps, 'icon'>

export const ImageCaptureButton = ({ autoOpen, facing, onChange, ...props }: ImageCaptureButtonProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleChange = (images: AppImage[]) => {
    // CameraModal returns Image objects; pass them directly to callers
    if (!images?.length) return onChange([] as unknown as AppImage[])
    onChange(images)
    handleClose()
  }
  useEffect(() => {
    if (autoOpen) handleOpen()
  }, [autoOpen])
  return (
    <>
      <IconButton {...props} icon='camera' onPress={handleOpen} />
      <CameraModal facing={facing} onClose={handleClose} onChange={handleChange} visible={open} />
    </>
  )
}
