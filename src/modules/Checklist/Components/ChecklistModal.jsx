import { CalendarIcon } from '@chakra-ui/icons'
import {  ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text,Flex, Spacer, Divider } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import PopoverForm from './PopoverForm'
import ChecklistContainer from './ChecklistContainer'
import { getChecklists,addChecklist,deleteChecklist } from '../Utils/checkListApi'
import { useErrorBoundary } from 'react-error-boundary'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../store/features/ChecklistSlice'

const ChecklistModal = ({cardName = '',listName = '',id = ''}) => {
  const {showBoundary} = useErrorBoundary();
  const {data,loading}  = useSelector((state)=> state.checklists)
  const checkListData = data[id];
  const dispatch = useDispatch();

  const addNewCheckList = (inputValue)=>{
    if(inputValue === '') return;
    addChecklist(id,inputValue)
    .then((data)=>{
        dispatch(actions.postCheckList({cardId : id , data : data}));
    })
    .catch((error)=>{
        showBoundary(error);
    })
  }

  const handleDelete = (triggerId)=>{
    deleteChecklist(triggerId)
    .then((status)=>{
        if(status === 200){
            dispatch(actions.deleteCheckList({cardId : id, data :triggerId }));
        }
    })
    .catch(error=>{
        showBoundary(error);
    })
  }


  useEffect(()=>{
    getChecklists(id)
    .then((data)=>{
        dispatch(actions.getCheckLists({cardId : id , data : data}));
    })
    .catch((error)=>{
        showBoundary(error);
    })
  },[])
  
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display={'flex'} flexDirection={'column'}>
        <Flex><CalendarIcon mt={'0.3rem'} /><Text pl={'1rem'}> {cardName} </Text></Flex>    
        <Text display={'flex'} pt={'2'} color={'#44546f'} fontSize={'sm'}>in list <Text as={'span'} pl={'1'} decoration={'underline'}>{listName}</Text> </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Flex width={'100%'} direction={{base:'column',md:'row'}}>
            {!loading ? <ChecklistContainer cardId={id} checkLists={checkListData} handleDelete={handleDelete} /> : null}
         <Flex direction={'column'} basis={'15%'} mt={{base:'1rem',md:'0'}}>
          <Divider display={{base:'inline-block',md:'none'}} border={'1px solid black'} />
            {!loading ? <Text fontWeight={'bold'} pl={'2'} color={'#44546f'} fontSize={'sm'}>Add to card</Text> : null}
           {!loading ?  <PopoverForm addNewCheckList={addNewCheckList} /> : null}
        </Flex>   
        </Flex>
        </ModalBody>
        <ModalFooter>
          <Spacer />
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default ChecklistModal
