import { CalendarIcon } from '@chakra-ui/icons'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text,Flex, Spacer, Divider } from '@chakra-ui/react'
import React, { useEffect, useReducer } from 'react'
import PopoverForm from './PopoverForm'
import ChecklistContainer from './ChecklistContainer'
import { getChecklists,addChecklist,deleteChecklist } from '../Utils/checkListApi'
import { checkListReducer, checkListinitalState } from '../Utils/checkListHelper'
import { useErrorBoundary } from 'react-error-boundary'

const ChecklistModal = ({isOpen,onClose,cardName,listName,id}) => {
  const [state,dispatcher] = useReducer(checkListReducer,checkListinitalState);
  const {showBoundary} = useErrorBoundary();

  const handleInput = (value)=>{
    dispatcher({type:'setInput',payload:value});    
    }

  const addNewCheckList = ()=>{
    if(state.inputValue === '') return;
    addChecklist(id,state.inputValue)
    .then((data)=>{
        dispatcher({type:'post',payload:data});
        dispatcher({type:'setInput',payload:''});
    })
    .catch((error)=>{
        showBoundary(error);
    })
  }

  const handleDelete = (event)=>{
    const trigger = event.target.closest('.delete_checklist');
    if(!trigger) return;
    const triggerId = trigger.id;
    deleteChecklist(triggerId)
    .then((status)=>{
        if(status === 200){
            dispatcher({type:'delete',payload:triggerId});
        }
    })
    .catch(error=>{
        showBoundary(error);
    })
  }


  useEffect(()=>{
    getChecklists(id)
    .then((data)=>{
        dispatcher({type:'fetch',payload:data})
    })
    .catch((error)=>{
        showBoundary(error);
    })
  },[])
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display={'flex'} flexDirection={'column'}>
        <Flex><CalendarIcon mt={'0.3rem'} /><Text pl={'1rem'}> {cardName} </Text></Flex>    
        <Text display={'flex'} pt={'2'} color={'#44546f'} fontSize={'sm'}>in list <Text as={'span'} pl={'1'} decoration={'underline'}>{listName}</Text> </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody onClick={handleDelete}>
        <Flex width={'100%'} direction={{base:'column',md:'row'}}>
            {!state.loading ? <ChecklistContainer cardId={id} checkLists={state.checkLists} /> : null}
         <Flex direction={'column'} basis={'15%'} mt={{base:'1rem',md:'0'}}>
          <Divider display={{base:'inline-block',md:'none'}} border={'1px solid black'} />
            <Text fontWeight={'bold'} pl={'2'} color={'#44546f'} fontSize={'sm'}>Add to card</Text>
            <PopoverForm handleInput={handleInput} addNewCheckList={addNewCheckList} />
        </Flex>   
        </Flex>
        </ModalBody>
        <ModalFooter>
          <Spacer />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ChecklistModal
