import React from "react";
import { Flex,Text,IconButton, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import ChecklistModal from "../../Checklist/Components/ChecklistModal";
const Card = ({id='',list='',name=''}) => {
  const {isOpen,onOpen,onClose} = useDisclosure();
  return (
    <>
    <Flex h={'10'} mb={'1'} borderRadius={'lg'} boxShadow="inset 0 0 1px rgba(0, 0, 0, 0.5)" bg={'#FFFFFF'} _hover={{border:'1px solid red'}}>
    <Flex onClick={onOpen}  justifyContent={'space-between'} width={'100%'} alignItems={'center'} h={'10'}  cursor={'pointer'} >
    <Text fontSize={'sm'} pl={'1rem'}> {name} </Text>
  </Flex>
    <IconButton 
    h={'1'}
    className='delete_card'
    id={id}
    _hover={{bgColor:'#FFFFFF',color:'red'}}
    variant={'ghost'}
    icon={<DeleteIcon />}
    mt={'3.5'}
    />
    </Flex>
  <ChecklistModal id={id} cardName={name} listName = {list} isOpen={isOpen} onClose={onClose} />
  </>
  );
};

export default Card;
