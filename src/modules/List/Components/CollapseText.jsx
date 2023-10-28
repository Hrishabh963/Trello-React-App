import { AddIcon } from '@chakra-ui/icons'
import { Button, CloseButton, Flex, Textarea, useDisclosure,Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

const CollapseText = ({handleInputChange,addCard,closeOutsideRef}) => {
  const [input,setInput] = useState('');
  const {isOpen,onToggle} = useDisclosure();
  const handleChange = (event)=>{
    const text = event.target.value;
    setInput(text);
    handleInputChange(text);
  }
  const handleClick = ()=>{
    addCard();
    setInput('');
  }

  return (
    <>
    <Button display={isOpen ? 'none' : 'flex'}  cursor={'pointer' } onClick={onToggle} _hover={{backgroundColor:'#091E4224'}} w={'50%'} fontSize={'0.8rem'}><AddIcon /><Text pl={'0.7rem'}>Add new card</Text></Button>
    {isOpen ? <Flex ref={closeOutsideRef} direction={'column'}>
      <Textarea autoFocus={true} value={input} onChange={handleChange} resize={'none'} placeholder='Enter a title for this card...' boxShadow="inset 0 0 1px rgba(0, 0, 0, 0.5)" backgroundColor={'#FFFFFF'} />
      <Flex pt={'3'} w={'70%'} >
        <Button h={'8'} rounded={'md'} onClick={handleClick} colorScheme='blue' >Add card</Button> <CloseButton onClick={onToggle} />
      </Flex>
    </Flex> : null}
    </>
  )
}

export default CollapseText
