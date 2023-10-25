import { CalendarIcon } from '@chakra-ui/icons'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text,Flex } from '@chakra-ui/react'
import React, { useEffect, useReducer } from 'react'
import PopoverForm from '../PopoverForm'
import axios from 'axios'
import ChecklistContainer from './ChecklistContainer'

const initalState = {
    checkLists : [],
    error : false,
    loading : true,
    inputValue: ''
  }

const ChecklistModal = ({isOpen,onClose,cardName,listName,id}) => {
  const [state,dispatcher] = useReducer(reducer,initalState)

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
        console.log(error);
        dispatcher({type:'error'});
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
        console.log(error);
        dispatcher({type:'error'});
    })
  }


  useEffect(()=>{
    getChecklists(id)
    .then((data)=>{
        dispatcher({type:'fetch',payload:data})
    })
    .catch((error)=>{
        console.log(error);
        dispatcher({type:'error'});
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
        <Flex width={'100%'}>
            <ChecklistContainer checkLists={state.checkLists} />
         <Flex direction={'column'} basis={'15%'}>
            <Text fontWeight={'bold'} pl={'2'} color={'#44546f'} fontSize={'sm'}>Add to card</Text>
            <PopoverForm handleInput={handleInput} addNewCheckList={addNewCheckList} />
        </Flex>   
        </Flex>
        </ModalBody>
        <ModalFooter>
        <h1>This is modal footer</h1>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ChecklistModal

const getChecklists = async (cardId)=>{
    try {
        const response = await axios.get(`https://api.trello.com/1/cards/${cardId}/checklists?key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

const addChecklist = async (cardId,name)=>{
    try {
        const response = await axios.post(`https://api.trello.com/1/checklists?idCard=${cardId}&key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}&name=${name}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

const deleteChecklist = async (checkListId)=>{
    try {
        const response = await axios.delete(`https://api.trello.com/1/checklists/${checkListId}?key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`);
        return response.status;
    } catch (error) {
        throw error;
    }
}

const reducer = (state,action)=>{
    switch (action.type){
      case "fetch":{
        return{
          ...state,
          checkLists : action.payload,
          error : false,
          loading : false
        }
      }
      case "error":{
        return{
          ...state,
          error : true,
          loading : false
        }
      }
      case "post":{
        return{
          ...state,
          checkLists:[...state.checkLists,action.payload]
        }
      }
      case "delete":{
        return{
          ...state,
          checkLists:state.checkLists.filter((checklist)=>checklist.id!==action.payload)
        }
      }
      case "setInput":{
        return{
          ...state,
          inputValue : action.payload
        }
      }
      default:
        return state;
    }
  }