import { useCallback, useMemo } from 'react'

import { Generic } from '../types'
import { capitalizedString, confirm, singularString } from '../utils'
import { FormModal } from './FormModal'

export type ItemFormModalProps<T> = {
  collection: string
  isNew: boolean
  item: T
  children?: React.ReactNode
  onDismiss: () => void
  onSave?: (item: T) => void
  visible: boolean
}

export const ItemFormModal = <T extends Generic>({ collection, isNew, item, children, onDismiss, onSave, visible }: ItemFormModalProps<T>) => {
  const title = useMemo(() => {
    const singular = capitalizedString(singularString(collection))
    return isNew ? `New ${singular}` : `Edit ${singular}`
  }, [collection, isNew])
  const handleDismiss = async () => {
    const confirmation = await confirm('Discard changes?', 'Are you sure?')
    if (confirmation) onDismiss()
  }
  const handleSave = useCallback(async () => {
    onSave?.(item)
    onDismiss()
  }, [item, onDismiss, onSave])
  return (
    <FormModal visible={visible} onDismiss={handleDismiss} onSave={handleSave} saving={false} title={title}>
      {children}
    </FormModal>
  )
}
