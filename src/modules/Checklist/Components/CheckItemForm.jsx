import { Box, Button, CloseButton, Collapse, Flex, Textarea, useDisclosure } from '@chakra-ui/react'
import React, { useEffect,useRef, useState } from 'react'

const CheckItemForm = ({addCheckItem}) => {
  const [input,setInput] = useState('');
  const {isOpen,onToggle} = useDisclosure();
  const handleChange = (event)=>{
    const text = event.target.value;
    setInput(text);
  }

  const handleClick = ()=>{
    addCheckItem();
    setInput('');
  }

  return (
    <>
    <Button display={isOpen ? 'none' : 'flex'} colorScheme='gray' fontSize={'sm'} w={'23%'} onClick={onToggle} >Add an item</Button>
    <Box w={'40%'}>
    <Collapse in={isOpen}>
      <Flex direction={'column'} w={'100%'} pt={'2'}>
        <Textarea value={input} onChange={handleChange} resize={'none'} placeholder='Add checkitem...' />
        <Flex pt={'2'}>
        <Button onClick={handleClick} colorScheme='blue'>Add item</Button><CloseButton ml={'1'} size={'lg'} onClick={onToggle} />
        </Flex>
      </Flex>
    </Collapse>
    </Box>
    </>
  )
}

export default CheckItemForm
