import { useState } from 'react'
import { Share, View } from 'react-native'
import { Divider } from 'react-native-paper'

import { icons } from '../constants'
import { useTheme } from '../hooks'
import { Generic } from '../types'
import { confirm, getPrimaryImage, snack } from '../utils'
import { ImageModal } from './ImageModal'
import { MenuItem } from './MenuItem'

export type ItemMenuItem = 'View' | 'Image' | 'Edit' | 'Duplicate' | 'Print' | 'Share' | 'Catalog' | 'Container' | 'Product' | 'Products' | 'Unit' | 'Units' | 'Delete'

export type ItemMenuProps<T> = {
  collection: string
  disabled?: ItemMenuItem[]
  hidden?: ItemMenuItem[]
  item: T
  onDismiss?: () => void
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
}

export const ItemMenu = <T extends Generic>({ collection, disabled = [], hidden = [], item, onDismiss, onEdit, onDelete }: ItemMenuProps<T>) => {
  const { theme } = useTheme()
  const primaryImage = getPrimaryImage(item.images)
  const [imageModal, setImageModal] = useState(false)
  const url = `app://${collection}/${item.id}`
  const hasImage = !!primaryImage?.value
  const handleDelete = async () => {
    if (!(await confirm(`Delete ${item.title}`, 'This cannot be undone. Are you sure?'))) return
    onDelete?.(item)
    onDismiss?.()
  }
  const handleEdit = () => onEdit?.(item)
  const handleImage = () => setImageModal(!imageModal)
  const handleShare = async () => {
    try {
      await Share.share({ url, message: item.title })
    } catch (err) {
      if (err instanceof Error) snack.error(err.message)
    }
  }
  if (!onEdit) hidden.push('Edit')
  return (
    <View>
      {!hidden.includes('Image') && hasImage ? <MenuItem disabled={disabled.includes('Image')} onPress={handleImage} title='Image' icon={icons.image} /> : null}
      {!hidden.includes('Edit') ? <MenuItem disabled={disabled.includes('Edit')} onDismiss={onDismiss} onPress={handleEdit} title='Edit' icon={icons.edit} /> : null}
      {!hidden.includes('Share') ? <MenuItem disabled={disabled.includes('Share')} onDismiss={onDismiss} onPress={handleShare} title='Share' icon={icons.share} /> : null}
      <Divider />
      {!hidden.includes('Delete') ? <MenuItem iconColor={theme.colors.onError} disabled={disabled.includes('Delete')} onDismiss={onDismiss} onPress={handleDelete} title='Delete' icon={icons.delete} style={{ backgroundColor: theme.colors.error }} textStyle={{ color: theme.colors.onError }} /> : null}
      <ImageModal image={primaryImage?.value} onDismiss={handleImage} visible={imageModal} />
    </View>
  )
}
