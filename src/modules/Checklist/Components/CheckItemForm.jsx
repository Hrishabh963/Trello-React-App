import { Button, CloseButton, Collapse, Flex, Textarea } from '@chakra-ui/react'
import React, { useEffect,useRef, useState } from 'react'

const CheckItemForm = ({isOpen=false,onToggle,addCheckItem,handleInputChange}) => {
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
    <Collapse in={isOpen}>
      <Flex direction={'column'} w={'40%'} pt={'2'}>
        <Textarea value={input} onChange={handleChange} ref={inpRef} resize={'none'} placeholder='Add checkitem...' />
        <Flex pt={'2'}>
        <Button onClick={handleClick} colorScheme='blue'>Add item</Button><CloseButton ml={'1'} size={'lg'} onClick={onToggle} />
        </Flex>
      </Flex>
    </Collapse>
  )
}

export default CheckItemForm
