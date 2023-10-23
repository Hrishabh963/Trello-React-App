import { AddIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Text, useDisclosure,Collapse, CloseButton, Box} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const List = ({name = '' , id=''}) => {
  const [showForm,setShowForm] = useState(false);
  const toggleForm = ()=>{
    setShowForm(prev=> !prev)
  }
  return (
    <Card backgroundColor={'#f1f2f4'} minH={'fit-content'} w={'20rem'} borderRadius={'2xl'}>
      <CardHeader fontWeight={'bold'} fontSize={'0.9rem'}>{name}</CardHeader>
      <CardBody>
        This is body of list
      </CardBody>
      <CardFooter>
        <Flex direction={'column'} w={'100%'}>
        <Button display={showForm ? 'none' : 'flex'}  cursor={'pointer' } onClick={toggleForm} _hover={{backgroundColor:'#091E4224'}} w={'50%'} fontSize={'0.8rem'}><AddIcon /><Text pl={'0.7rem'}>Add new card</Text></Button>
          <Box display={showForm ? 'flex' : 'none'}>  
          <CloseButton onClick={toggleForm} /></Box>
        </Flex>
        
      </CardFooter>
    </Card>
  )
}

const getCards = async (id)=>{
try {
    const response = await axios.get(`https://api.trello.com/1/lists/${id}/cards?key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}&fields=name,idChecklists`);
    return  response.data;
} catch (error) {
    throw error;
}
}

export default List
