import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons'
import { Button, Flex, IconButton, Progress, Text, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import React, { useEffect, useReducer, useRef } from 'react'
import Checkitem from './Checkitem'
import CheckItemForm from './CheckItemForm'
import { getCheckItems,postCheckItem,deleteCheckItem,updateCheckState } from '../Utils/checkItemApi'
import { reducer,initalState } from '../Utils/checkItemsHelper'
import { useErrorBoundary } from 'react-error-boundary'
const Checklist = ({id='',name='',cardId=''}) => {
  const [state,dispatcher] = useReducer(reducer,initalState);
  const {isOpen,onToggle} = useDisclosure();
  const {showBoundary} = useErrorBoundary();
  const ref = useRef();
  useOutsideClick({
    ref:ref,
    handler:()=>{
      if(isOpen){
        onToggle()
    }
    }
  })
  const handleInputChange = (value)=>{
    dispatcher({type:'setInput',payload:value});
  }

  const addCheckItem = ()=>{
    if(state.inputValue === '') return;
    postCheckItem(id,state.inputValue)
    .then((data)=>{
        dispatcher({type:'post',payload:data});
        dispatcher({type:'setInput',payload:''});
        dispatcher({type:'setPercentage'})
    })
    .catch((error)=>{
        showBoundary(error);
    })
  }

  const handleCheckState = (check,checkItemId)=>{
    dispatcher({type:'changeState',payload:{check : check,id : checkItemId}});
    dispatcher({type:'setPercentage'});
    updateCheckState(cardId,id,checkItemId,state.checkItems,check)
  }


  const handleDelete = (event)=>{
    const trigger = event.target.closest('.delete_checkitem');
    if(!trigger) return;
    const triggerId = trigger.id;
    deleteCheckItem(id,triggerId)
    .then((status)=>{
        if(status === 200){
            dispatcher({type:'delete',payload:triggerId});
            dispatcher({type:'setPercentage'})
        }
    })
    .catch((error)=>{
        showBoundary(error);
    })
  }


  useEffect(()=>{
    getCheckItems(id)
    .then((data)=>{
        dispatcher({type:'fetch',payload:data});
        dispatcher({type:'setPercentage'});
    })
    .catch((error)=>{
        showBoundary(error);
    })
  },[])

  return (
    <Flex direction={'column'} py={'3'} onClick={handleDelete}>
        <Flex width={'100%'}><CheckCircleIcon mt={'1'} /><Text fontSize={'lg'} fontWeight={'bold'} pl={'2'}>{name}</Text><IconButton id={id} className='delete_checklist' h={'5'} mt={'1'} ml={'3'} _hover={{bgColor:'#FFFFFF',color:'red'}} variant={'ghost'} icon={<DeleteIcon />} /></Flex>
        {!state.loading && state.checkItems.length > 0 ? <Flex alignItems={'center'}><Text pr={'2'}>{state.percentage}%</Text><Progress size={'sm'} w={'90%'} colorScheme={'green'} value={state.percentage} /></Flex> : null}
        {!state.loading ? state.checkItems.map((checkitem)=>{
            return <Checkitem handleCheckState={handleCheckState} key={checkitem.id} checked={checkitem.state === 'complete' ? true : false} name={checkitem.name} id={checkitem.id} />
        }):null}
        <Flex pt={'2'} direction={'column'} w={{base:'30%',md:'20%'}}>
          {!state.loading ?  <Button display={isOpen ? 'none' : 'flex'} colorScheme='gray' fontSize={'sm'} onClick={onToggle} >Add an item</Button> : null}
        </Flex>
        <CheckItemForm clickOutsideRef={ref} handleInputChange={handleInputChange} addCheckItem={addCheckItem} isOpen={isOpen} onToggle={onToggle} />
    </Flex>
  )
}

export default Checklist

