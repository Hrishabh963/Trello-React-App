import { Box, Button, CloseButton, Collapse, Flex, Textarea } from '@chakra-ui/react'
import React, { useEffect,useRef, useState } from 'react'

const CheckItemForm = ({isOpen=false,onToggle,addCheckItem,handleInputChange,clickOutsideRef}) => {
  const inpRef = useRef();
  const [input,setInput] = useState('');
  const handleChange = (event)=>{
    const text = event.target.value;
    setInput(text);
    handleInputChange(text);
  }

  const handleClick = ()=>{
    addCheckItem();
    setInput('');
  }
  useEffect(()=>{
    inpRef.current.focus();
  },[isOpen])
  return (
    <Box w={'40%'} ref={clickOutsideRef}>
    <Collapse in={isOpen}>
      <Flex direction={'column'} w={'100%'} pt={'2'}>
        <Textarea value={input} onChange={handleChange} ref={inpRef} resize={'none'} placeholder='Add checkitem...' />
        <Flex pt={'2'}>
        <Button onClick={handleClick} colorScheme='blue'>Add item</Button><CloseButton ml={'1'} size={'lg'} onClick={onToggle} />
        </Flex>
      </Flex>
    </Collapse>
    </Box>
  )
}

export default CheckItemForm
