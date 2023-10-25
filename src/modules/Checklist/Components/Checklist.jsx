import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons'
import { Button, Checkbox, CheckboxGroup, Flex, IconButton, Progress, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import Checkitem from './Checkitem'
import CheckItemForm from './CheckItemForm'

const initalState = {
    checkItems : [],
    percentage:0,
    error : false,
    loading : true,
    inputValue: ''
  }

const Checklist = ({id='',name=''}) => {
  const [state,dispatcher] = useReducer(reducer,initalState);
  const {isOpen,onToggle} = useDisclosure();

  const handleInputChange = (value)=>{
    dispatcher({type:'setInput',payload:value});
  }

  const addCheckItem = ()=>{
    if(state.inputValue === '') return;
    postCheckItem(id,state.inputValue)
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
    const trigger = event.target.closest('.delete_checkitem');
    if(!trigger) return;
    const triggerId = trigger.id;
    deleteCheckItem(id,triggerId)
    .then((status)=>{
        if(status === 200){
            dispatcher({type:'delete',payload:triggerId});
        }
    })
    .catch((error)=>{
        console.log(error);
        dispatcher({type:'error'})
    })
  }

  useEffect(()=>{
    getCheckItems(id)
    .then((data)=>{
        dispatcher({type:'fetch',payload:data});
    })
    .catch((error)=>{
        console.log(error);
        dispatcher({type:'error'});
    })
  },[])
  const percentage = state.percentage;
  return (
    <Flex direction={'column'} py={'3'} onClick={handleDelete}>
        <Flex width={'100%'}><CheckCircleIcon mt={'1'} /><Text fontSize={'lg'} fontWeight={'bold'} pl={'2'}>{name}</Text><IconButton id={id} className='delete_checklist' h={'5'} mt={'1'} ml={'3'} _hover={{bgColor:'#FFFFFF',color:'red'}} variant={'ghost'} icon={<DeleteIcon />} /></Flex>
        <Flex alignItems={'center'}><Text pr={'2'}>{percentage}%</Text><Progress size={'sm'} w={'90%'} colorScheme={'green'} value={state.percentage} /></Flex>
        {state.checkItems.map((checkitem)=>{
            return <Checkitem key={checkitem.id} name={checkitem.name} id={checkitem.id} />
        })}
        <Flex pt={'2'} direction={'column'} w={'20%'}>
        <Button display={isOpen ? 'none' : 'flex'} colorScheme='gray' fontSize={'sm'} onClick={onToggle} >Add an item</Button>
        </Flex>
        <CheckItemForm handleInputChange={handleInputChange} addCheckItem={addCheckItem} isOpen={isOpen} onToggle={onToggle} />
    </Flex>
  )
}

export default Checklist

const getCheckItems = async (checkListId)=>{
    try {
        const response = await axios.get(`https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

const postCheckItem = async (checkListId,name)=>{
    try {
        const response = await axios.post(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${name}&key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const deleteCheckItem = async (checkListId,checkItemId)=>{
    try {
        const response = await axios.delete(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`);
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
          checkItems : action.payload,
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
          checkItems:[...state.checkItems,action.payload]
        }
      }
      case "delete":{
        return{
          ...state,
          checkItems:state.checkItems.filter((checkItem)=>checkItem.id!==action.payload)
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