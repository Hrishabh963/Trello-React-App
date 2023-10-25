import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons'
import { Checkbox, CheckboxGroup, Flex, IconButton, Progress, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import Checkitem from './Checkitem'

const initalState = {
    checkItems : [],
    percentage:0,
    error : false,
    loading : true,
    inputValue: ''
  }

const Checklist = ({id='',name=''}) => {
  const [state,dispatcher] = useReducer(reducer,initalState);
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
    <CheckboxGroup>
        <Flex width={'100%'}><CheckCircleIcon mt={'1'} /><Text fontSize={'lg'} fontWeight={'bold'} pl={'2'}>{name}</Text><IconButton id={id} className='delete_checklist' h={'5'} mt={'1'} ml={'3'} _hover={{bgColor:'#FFFFFF'}} variant={'ghost'} icon={<DeleteIcon />} /></Flex>
        <Flex alignItems={'center'}><Text pr={'2'}>{percentage}%</Text><Progress size={'sm'} w={'90%'} colorScheme={'green'} value={state.percentage} /></Flex>
        {state.checkItems.map((checkitem)=>{
            return <Checkitem name={checkitem.name} id={checkitem.id} />
        })}
    </CheckboxGroup>
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
          checkItems:state.checkItems.filter((checklist)=>checkItems.id!==action.payload)
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