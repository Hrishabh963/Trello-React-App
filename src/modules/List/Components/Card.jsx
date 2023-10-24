import React from "react";
import { Flex,Text,IconButton, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import ChecklistModal from "../../Checklist/Components/ChecklistModal";
const Card = ({id='',name=''}) => {
  const {isOpen,onOpen,onClose} = useDisclosure();
  return (
    <>
    <Flex onClick={onOpen} my={'0.2rem'}  bg={'#FFFFFF'} justifyContent={'space-between'} width={'100%'} alignItems={'center'} h={'10'} borderRadius={'lg'} boxShadow="inset 0 0 1px rgba(0, 0, 0, 0.5)" cursor={'pointer'} _hover={{border:'1px solid red'}}>
    <Text fontSize={'sm'} pl={'1rem'}> {name} </Text>
    <IconButton 
    h={'1'}
    className='delete_card'
    id={id}
    _hover={{bgColor:'#FFFFFF'}}
    variant={'ghost'}
    icon={<DeleteIcon />}
    />
  </Flex>
  <ChecklistModal isOpen={isOpen} onClose={onClose} />
  </>
  );
};

export default Card;
