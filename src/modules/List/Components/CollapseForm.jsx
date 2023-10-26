import { Button, Card, CardBody, CloseButton, HStack, Input } from '@chakra-ui/react'
import React, { useRef, useState,useEffect } from 'react'

const CollapseForm = ({onToggle,addList,handleInputChange,clickOutRef}) => {
  const [input,setInput] = useState('');
  const handleChange = (event)=>{
    const text = event.target.value;
    setInput(text);
    handleInputChange(text);
  }
  const handleClick = ()=>{
    addList();
    setInput('')
  }
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return (
    
    <Card ref={clickOutRef} backgroundColor={'#f1f2f4'}  w={"20rem"} h={'fit-content'} borderRadius={'2xl'}>
      <CardBody>
        <Input ref={inputRef} value={input} onChange={handleChange} backgroundColor={'white'} autoFocus={true} placeholder='Enter List title...' />
        <HStack py={'1rem'}><Button colorScheme='blue' onClick={handleClick}>Add list</Button> <CloseButton onClick={onToggle} /></HStack>
      </CardBody>
    </Card>

  )
}

export default CollapseForm
