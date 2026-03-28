import { Modal as RNModal, ModalProps as RNModalProps, StyleSheet } from 'react-native'
import { Portal } from 'react-native-paper'

import { layout } from '../constants'
import { Snackbar } from './Snackbar'
import { Wrapper } from './Wrapper'

export type ModalProps = RNModalProps & {}

export const Modal = ({ children, animationType = layout.modalAnimation, ...props }: ModalProps) => (
  <RNModal animationType={animationType} {...props}>
    <Portal.Host>
      <Wrapper>
        {children}
        <Snackbar />
      </Wrapper>
    </Portal.Host>
  </RNModal>
)

const styles = StyleSheet.create({})
