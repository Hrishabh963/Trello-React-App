import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons'
import { Button, Flex, IconButton, Progress, Text, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import React, { useEffect, useReducer, useRef } from 'react'
import Checkitem from './Checkitem'
import CheckItemForm from './CheckItemForm'
import { getCheckItems,postCheckItem,deleteCheckItem,updateCheckState } from '../Utils/checkItemApi'
import { reducer,initalState } from '../Utils/checkItemsHelper'
import { useErrorBoundary } from 'react-error-boundary'
const Checklist = ({id='',name='',cardId='',handleDelete}) => {
  const [state,dispatch] = useReducer(reducer,initalState);
  const {showBoundary} = useErrorBoundary();

  const addCheckItem = ()=>{
    if(state.inputValue === '') return;
    postCheckItem(id,state.inputValue)
    .then((data)=>{
        dispatch({type:'post',payload:data});
        dispatch({type:'setInput',payload:''});
        dispatch({type:'setPercentage'})
    })
    .catch((error)=>{
        showBoundary(error);
    })
  }

  const handleCheckState = (check,checkItemId)=>{
    dispatch({type:'changeState',payload:{check : check,id : checkItemId}});
    dispatch({type:'setPercentage'});
    updateCheckState(cardId,id,checkItemId,state.checkItems,check)
  }


  const handleCheckListDelete = (event)=>{
    const trigger = event.target.closest('.delete_checkitem');
    if(!trigger) return;
    const triggerId = trigger.id;
    deleteCheckItem(id,triggerId)
    .then((status)=>{
        if(status === 200){
            dispatch({type:'delete',payload:triggerId});
            dispatch({type:'setPercentage'})
        }
    })
    .catch((error)=>{
        showBoundary(error);
    })
  }

  const deleteCurrentChecklist = (event)=>{
    event.stopPropagation();
    handleDelete(id);
  }


  useEffect(()=>{
    getCheckItems(id)
    .then((data)=>{
        dispatch({type:'fetch',payload:data});
        dispatch({type:'setPercentage'});
    })
    .catch((error)=>{
        showBoundary(error);
    })
  },[])

  return (
    <Flex direction={'column'} py={'3'} onClick={handleCheckListDelete}>
        <Flex width={'100%'}><CheckCircleIcon mt={'1'} /><Text fontSize={'lg'} fontWeight={'bold'} pl={'2'}>{name}</Text><IconButton onClick={deleteCurrentChecklist} h={'5'} mt={'1'} ml={'3'} _hover={{bgColor:'#FFFFFF',color:'red'}} variant={'ghost'} icon={<DeleteIcon />} /></Flex>
        {!state.loading && state.checkItems.length > 0 ? <Flex alignItems={'center'}><Text pr={'2'}>{state.percentage}%</Text><Progress size={'sm'} w={'90%'} colorScheme={'green'} value={state.percentage} /></Flex> : null}
        {!state.loading ? state.checkItems.map((checkitem)=>{
            return <Checkitem handleCheckState={handleCheckState} key={checkitem.id} checked={checkitem.state === 'complete' ? true : false} name={checkitem.name} id={checkitem.id} />
        }):null}
        <Flex pt={'2'} direction={'column'} w={{base:'30%',md:'20%'}}>
        </Flex>
        <CheckItemForm addCheckItem={addCheckItem} />
    </Flex>
  )
}

export default Checklist

