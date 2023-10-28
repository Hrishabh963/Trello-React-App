import { AddIcon } from '@chakra-ui/icons'
import { Button, CloseButton, Flex, Textarea, useDisclosure,Text, useOutsideClick } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

const CollapseText = ({addCard}) => {
  const [input,setInput] = useState('');
  const {isOpen,onToggle} = useDisclosure();
  const formRef = useRef();

  //Custom hook to close form on focus out
  useOutsideClick({
    ref : formRef,
    handler : ()=>{
      if(isOpen){
        onToggle();
      }
    }
  })
  
  //Function to handle input change
  const handleChange = (event)=>{
    const text = event.target.value;
    setInput(text);
  }

  //Function to add card
  const handleClick = ()=>{
    addCard(input);
    setInput('');
  }

  return (
    <>
    {!isOpen ? <Button  cursor={'pointer' } onClick={onToggle} _hover={{backgroundColor:'#091E4224'}} w={'50%'} fontSize={'0.8rem'}><AddIcon /><Text pl={'0.7rem'}>Add new card</Text></Button> : null}
    {isOpen ? <Flex ref={formRef} direction={'column'}>
      <Textarea autoFocus={true} value={input} onChange={handleChange} resize={'none'} placeholder='Enter a title for this card...' boxShadow="inset 0 0 1px rgba(0, 0, 0, 0.5)" backgroundColor={'#FFFFFF'} />
      <Flex pt={'3'} w={'70%'} >
        <Button h={'8'} rounded={'md'} onClick={handleClick} colorScheme='blue' >Add card</Button> <CloseButton onClick={onToggle} />
      </Flex>
    </Flex> : null}
    </>
  )
}

export default CollapseText
