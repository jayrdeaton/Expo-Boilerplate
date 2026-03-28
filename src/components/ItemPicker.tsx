/**
 * ItemPicker
 *
 * Full-screen modal wrapper around {@link ItemList} for picking an item from a collection.
 *
 * Example:
 *   <ItemPicker<Product> visible={open} collection="products" icon="cube" onPress={selectProduct} />
 */
import { GestureResponderEvent } from 'react-native'

import { icons } from '../constants'
import { Filter } from '../models'
import { Generic } from '../types'
import { capitalizedString, singularString } from '../utils'
import { Header } from './Header'
import { IconButton } from './IconButton'
import { ItemList, ItemListProps } from './ItemList'
import { Modal } from './Modal'
import { ScrollViewProvider } from './ScrollViewProvider'

/**
 * Props for {@link ItemPicker}.
 *
 * @property collection - Firestore collection name to query.
 * @property icon - Icon to show in the header.
 * @property onChange - Change handler for item picking.
 * @property onClose - Close handler for the modal.
 * @property params - Optional filter params for the query.
 * @property visible - Whether the modal is visible.
 */
export type ItemPickerProps<T> = {
  collection: string
  icon: string
  onChange: (item: T, event?: GestureResponderEvent) => void
  onClose: () => void
  params?: Filter
  visible: boolean
} & Partial<ItemListProps<T>>

export const ItemPicker = <T extends Generic>({ collection, icon, onChange, onClose, params, visible }: ItemPickerProps<T>) => {
  const collectionString = capitalizedString(singularString(collection))
  return (
    <Modal visible={visible}>
      <ScrollViewProvider>
        <Header title={`Select ${collectionString}`} LeftComponent={<IconButton icon={icons.close} onPress={onClose} />} />
        <ItemList collection={collection} icon={icon} onPress={onChange} params={params} />
      </ScrollViewProvider>
    </Modal>
  )
}
