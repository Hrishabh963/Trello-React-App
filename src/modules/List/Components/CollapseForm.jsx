import { Button, Card, CardBody, CardHeader, CloseButton, HStack, Input, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import React, { useRef, useState,useEffect } from 'react'

const CollapseForm = ({addList}) => {
  const [input,setInput] = useState('');
  const { isOpen, onToggle } = useDisclosure();
  const outRef = useRef();
  useOutsideClick({
    ref: outRef,
    handler: () => {
      if(isOpen){
        onToggle();
      }
    }
  })
  const handleChange = (event)=>{
    const text = event.target.value;
    setInput(text);
  }
  
  const handleClick = ()=>{
    addList(input);
    setInput('');
  }

  return (
    <>
    <Card
          display={isOpen?'none':'flex'}
          h={"fit-content"}
          w={"20rem"}
          opacity={"0.7"}
          borderRadius={"2xl"}
          cursor={"pointer"}
        >
          <CardHeader onClick={onToggle}>Add another list...</CardHeader>
        </Card>
        {isOpen ? <Card ref={outRef} backgroundColor={'#f1f2f4'}  w={"20rem"} h={'fit-content'} borderRadius={'2xl'}>
      <CardBody>
        <Input value={input} autoFocus={true} onChange={handleChange} backgroundColor={'white'} placeholder='Enter List title...' />
        <HStack py={'1rem'}><Button colorScheme='blue' onClick={handleClick}>Add list</Button> <CloseButton onClick={onToggle} /></HStack>
      </CardBody>
    </Card>
  :null}
    </>

  )
}

export default CollapseForm
