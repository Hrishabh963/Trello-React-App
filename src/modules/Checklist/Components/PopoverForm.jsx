import React, { useState,useRef } from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Box,
    Flex,
    Input,
    Button,
} from '@chakra-ui/react';

const PopoverForm = ({addNewCheckList}) => {
  const [input,setInput] = useState('');
  const inputRef = useRef();
  const handleChange = (event)=>{
    const text = event.target.value;
    setInput(text);
  }
  const handleClick = ()=>{
    addNewCheckList(input);
    setInput('');
  }
  return (
    <Popover initialFocusRef={inputRef}>
      <PopoverTrigger>
      <Box cursor={'pointer'} fontSize={'sm'} w={'32'} h={'8'} display={'flex'} alignItems={'center'} pl={'3'} textColor={'#172b4d'} fontWeight={'bold'} bgColor={'#091E420F'} _hover={{bgColor:'#091E4224'}} borderRadius={'lg'}>Add Checklist</Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight={'bold'} display={'flex'} justifyContent={'center'}>
            Create Checklist
        </PopoverHeader>
        <PopoverBody>
            <Flex direction={'column'}>
                <Input ref={inputRef} value={input} onChange={handleChange} placeholder='Enter checklist name...' my={'2'} />
                <Box w={'40%'}><Button colorScheme='blue' onClick={handleClick}>Add checklist</Button></Box>
            </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverForm
