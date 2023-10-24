import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const ChecklistModal = ({isOpen,onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Hello world</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <h1>This is modal body</h1>
        </ModalBody>
        <ModalFooter>
        <h1>This is modal footer</h1>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ChecklistModal
