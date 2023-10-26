import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import Checklist from './Checklist'
import { HamburgerIcon } from '@chakra-ui/icons'



const ChecklistContainer = ({cardId,checkLists=[]}) => {
  return (
    <Flex direction={'column'} basis={'80%'}>
     <Flex pb={'6'}><HamburgerIcon mt={'1'} /><Heading size={'md'} pb={'1'} pl={'1'}>Checklists</Heading></Flex>
     {checkLists.map((checklist)=><Checklist cardId={cardId} key={checklist.id} id={checklist.id} name={checklist.name} />)} 
    </Flex>
  )
}

export default ChecklistContainer
