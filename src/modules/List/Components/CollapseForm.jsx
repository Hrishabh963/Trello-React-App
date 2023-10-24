import { Button, Card, CardBody, CardHeader, CloseButton, HStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const CollapseForm = ({isOpen,onToggle}) => {
  const [input,setInput] = useState('');
  const handleChange = (event)=>{
    const text = event.target.value;
    setInput(text);
  }
  return (
    <Card mt={'-10'} backgroundColor={'#f1f2f4'} display={isOpen?'flex' : 'none'}  w={"20rem"} minHeight={'fit-content'} borderRadius={'2xl'}>
      <CardBody>
        <Input value={input} onChange={handleChange} backgroundColor={'white'} autoFocus={true} placeholder='Enter List title...' />
        <HStack py={'1rem'}><Button colorScheme='blue'>Add list</Button> <CloseButton onClick={onToggle} /></HStack>
      </CardBody>
    </Card>

  )
}

export default CollapseForm
