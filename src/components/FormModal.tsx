import { StyleSheet } from 'react-native'

import { icons } from '../constants'
import { useTheme } from '../hooks'
import { ThemeVariant } from '../types'
import { Button } from './Button'
import { Footer } from './Footer'
import { Header } from './Header'
import { IconButton } from './IconButton'
import { Modal, ModalProps } from './Modal'
import { ScrollView } from './ScrollView'
import { ScrollViewProvider } from './ScrollViewProvider'

export type FormModalProps = ModalProps & {
  onDelete?: () => void
  onDismiss: () => void
  onSave: () => void
  saving: boolean
  title: string
  variant?: ThemeVariant
}

export const FormModal = ({ children, onDelete, onDismiss, onSave, saving, title, variant, ...props }: FormModalProps) => {
  const { theme } = useTheme()
  return (
    <Modal {...props} animationType='slide'>
      <ScrollViewProvider>
        <Header title={title} LeftComponent={<IconButton icon={icons.close} onPress={onDismiss} />} />
        <ScrollView>{children}</ScrollView>
        <Footer style={styles.footer}>
          <Button icon={icons.checkmark} onPress={onSave} loading={saving} variant={variant}>
            Save
          </Button>
          {onDelete && (
            <Button textColor={theme.colors.error} icon={icons.delete} onPress={onDelete}>
              Delete
            </Button>
          )}
        </Footer>
      </ScrollViewProvider>
    </Modal>
  )
}

const styles = StyleSheet.create({
  footer: { flexDirection: 'row-reverse', justifyContent: 'space-between' }
})
