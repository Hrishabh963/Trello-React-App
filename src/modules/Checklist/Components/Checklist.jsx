import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Progress, Text } from '@chakra-ui/react'
import React, { useEffect} from 'react'
import Checkitem from './Checkitem'
import CheckItemForm from './CheckItemForm'
import { getCheckItems,postCheckItem,deleteCheckItem,updateCheckState } from '../Utils/checkItemApi'
import { useErrorBoundary } from 'react-error-boundary'
import { useDispatch, useSelector } from 'react-redux'
import { calculatePercentage } from '../Utils/checkItemsHelper'
import { actions } from '../../../store/features/checkItemsSlice'

const Checklist = ({id='',name='',cardId='',handleDelete}) => {
  const {showBoundary} = useErrorBoundary();
  const {data,loading} = useSelector((state)=>state.checkitems); 
  const dispatch = useDispatch();
  const checkItemsData = data[id] ? data[id] : [];
  const percentage =  calculatePercentage(checkItemsData);

  const addCheckItem = (inputValue)=>{
    if(inputValue === '') return;
    postCheckItem(id,inputValue)
    .then((data)=>{
        dispatch(actions.postCheckItem({checkListId : id, data : data}));
    })
    .catch((error)=>{
        showBoundary(error);
    })
  }

  const handleCheckState = (check,checkItemId)=>{
    dispatch(actions.updateCheckItemState({checkListId : id,checked : check,id : checkItemId }));
    updateCheckState(cardId,id,checkItemId,checkItemsData,check)
  }


  const handleCheckItemsDelete = (triggerId)=>{
    deleteCheckItem(id,triggerId)
    .then((status)=>{
        if(status === 200){
            dispatch(actions.deleteCheckItem({checkListId : id, data : triggerId}));
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
        dispatch(actions.getCheckItems({checkListId : id , data : data}))
    })
    .catch((error)=>{
        showBoundary(error);
    })
  },[])

  return (
    <Flex direction={'column'} py={'3'}>
        <Flex width={'100%'}><CheckCircleIcon mt={'1'} /><Text fontSize={'lg'} fontWeight={'bold'} pl={'2'}>{name}</Text><IconButton onClick={deleteCurrentChecklist} h={'5'} mt={'1'} ml={'3'} _hover={{bgColor:'#FFFFFF',color:'red'}} variant={'ghost'} icon={<DeleteIcon />} /></Flex>
        {loading && checkItemsData.length > 0 ? <Flex alignItems={'center'}><Text pr={'2'}>{percentage}%</Text><Progress size={'sm'} w={'90%'} colorScheme={'green'} value={percentage} /></Flex> : null}
        {loading ? checkItemsData.map((checkitem)=>{
            return <Checkitem handleCheckState={handleCheckState} key={checkitem.id} handleCheckItemsDelete={handleCheckItemsDelete} checked={checkitem.state === 'complete' ? true : false} name={checkitem.name} id={checkitem.id} />
        }):null}
        <CheckItemForm addCheckItem={addCheckItem} />
    </Flex>
  )
}

export default Checklist

