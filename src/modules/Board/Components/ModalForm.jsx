import { Modal,ModalBody,ModalOverlay,ModalHeader,ModalCloseButton,ModalContent,Flex,Button,Input } from '@chakra-ui/react'
import React from 'react'

const ModalForm = ({isOpen,onClose,postBoard,input,handleInput}) => {
  return (
    <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection={'column'}>
            <label>
              Board Name:
              <Input value={input} onChange={(event)=>handleInput(event.target.value)} focusBorderColor="blue.400" errorBorderColor="red.300" isInvalid mt={'1'} isRequired placeholder="Enter Board Name" />
            </label>
            <Flex py={'2rem'} w={'100%'}>
              <Button colorScheme="blue" onClick={postBoard}>Create </Button>
              <Button variant={'ghost'} onClick={onClose}>Close</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default ModalForm
