import { Button, CloseButton, Flex, Textarea } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

const CollapseText = ({toggleForm,handleInputChange,addCard}) => {
  const [input,setInput] = useState('');
  const inputRef = useRef();
  const handleChange = (event)=>{
    const text = event.target.value;
    setInput(text);
    handleInputChange(text);
  }
  const handleClick = ()=>{
    addCard();
    setInput('');
  }
  useEffect(()=>{
    inputRef.current.focus();
  },[])
  return (
    <Flex direction={'column'}>
      <Textarea ref={inputRef} value={input} onChange={handleChange} resize={'none'} placeholder='Enter a title for this card...' boxShadow="inset 0 0 1px rgba(0, 0, 0, 0.5)" backgroundColor={'#FFFFFF'} />
      <Flex pt={'3'} w={'70%'} >
        <Button h={'8'} rounded={'md'} onClick={handleClick} colorScheme='blue' >Add card</Button> <CloseButton onClick={toggleForm} />
      </Flex>
    </Flex>
  )
}

export default CollapseText
