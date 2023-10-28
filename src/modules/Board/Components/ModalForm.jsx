import { ModalBody,ModalOverlay,ModalHeader,ModalCloseButton,ModalContent,Flex,Button,Input, useDisclosure, Modal, Box, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

const ModalForm = ({postBoard}) => {
  const [input,setinput] = useState('');
  const {isOpen,onOpen,onClose} = useDisclosure();
  const inRef = useRef();

  const handleInputChange = (value)=>{
    setinput(value);
  }
  const addBoard = ()=>{
    postBoard(input);
    onClose();
  }
  return (
    <>
    <Box h={'10rem'} display={'flex'} alignItems={{base:'flex-start',md:'center'}} p={{base:'3',md:'0'}} onClick={onOpen} justifyContent={'center'} bgColor={'#091e4224'} borderRadius={'2xl'} _hover={{bgColor:'#091E424F'}}>
        <Text fontSize={'base'}>Create new board</Text>
      </Box>
      <Modal
      isOpen={isOpen}
      initialFocusRef={inRef}
      onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection={'column'}>
            <label>
              Board Name:
              <Input ref={inRef} value={input} onChange={(event)=>handleInputChange(event.target.value)} focusBorderColor="blue.400" errorBorderColor="red.300" isInvalid mt={'1'} isRequired placeholder="Enter Board Name" />
            </label>
            <Flex py={'2rem'} w={'100%'}>
              <Button colorScheme="blue" onClick={addBoard}>Create </Button>
              <Button variant={'ghost'} onClick={onClose} >Close</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
        </Modal>
      </>
  )
}

export default ModalForm
