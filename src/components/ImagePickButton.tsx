import * as ImagePicker from 'expo-image-picker'
import { useEffect } from 'react'

import { useSnack } from '../hooks'
import { IconButton, IconButtonProps } from './IconButton'

type Image = { id?: string; value?: string; blurhash?: string }

export type ImagePickButtonProps = { autoOpen?: boolean; onChange: (images: Image[]) => void } & Omit<IconButtonProps, 'icon'>

export const ImagePickButton = ({ autoOpen, onChange, ...props }: ImagePickButtonProps) => {
  const snack = useSnack()
  const handlePress = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') return snack.warning('Media permission denied')
      const { assets } = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        aspect: [1.5, 1],
        mediaTypes: ['images'],
        orderedSelection: true,
        quality: 1
      })
      if (!assets?.length) return
      const images: Image[] = assets.map((a) => ({ value: a.uri }))
      onChange(images)
    } catch (err) {
      if (err instanceof Error) snack.error(err.message)
    }
  }
  useEffect(() => {
    if (autoOpen) handlePress()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return <IconButton {...props} icon='images' onPress={handlePress} />
}
