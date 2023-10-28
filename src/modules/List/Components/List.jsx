import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Card, CardBody, CardFooter, CardHeader, IconButton ,Flex, Text, Spinner, useOutsideClick} from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import CardsContainer from '../../Card/Components/CardsContainer'
import CollapseText from './CollapseText'
import { getCards, postCard, deleteCard } from '../Utils/CardApi'
import { useErrorBoundary } from 'react-error-boundary'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../store/features/cardsSlice'

const List = ({name = '' , id='', handleDelete}) => {

  const {showBoundary} = useErrorBoundary();
  const {data,loading} = useSelector((state)=> state.cards)
  const dispatch = useDispatch();
  const ref = useRef()
  const toggleForm = ()=>{
    dispatch({type :'showForm'})
  }

  const handleInputChange = (value)=>{
    dispatch({type:'setInput',payload:value});
  }

  // const handleDelete = (event)=>{
  //   const trigger = event.target.closest('.delete_card');
  //   if(!trigger) return;
  //   const triggerId = trigger.id;
  //   deleteCard(triggerId)
  //   .then((status)=>{
  //     if(status === 200){
  //       dispatch({type:'deleteCard',payload:triggerId})
  //     }
  //   })
  //   .catch(error=>{
  //     showBoundary(error)
  //   })
  // }

  const addCard = ()=>{
    // if(state.inputValue === '')return;
    // postCard(state.inputValue,id)
    // .then((data)=>{
    //   dispatch({type:'post',payload:{id:data.id,name:data.name}});
    //   dispatch({type:'setInput',payload:''});
    // })
    // .catch((error)=>{
    //   showBoundary(error);
    // })
    
  }

  useEffect(()=>{
    getCards(id)
    .then((data)=>{
      dispatch(actions.getCards(data));
    })
    .catch((error)=>{
      showBoundary(error);
    })
  },[])

  return (
    <Card backgroundColor={'#f1f2f4'} h={'fit-content'} w={'20rem'} borderRadius={'2xl'}>
      <CardHeader fontWeight={'bold'} fontSize={'0.9rem'}>
        <Flex w={'100%'} justifyContent={'space-between'}>
        <Text>{name}</Text>
        <IconButton onClick={(event)=>{
          event.stopPropagation();
          handleDelete(id);
          }}  _hover={{color:'red'}}  icon={<DeleteIcon />} mt={'-2'} cursor={'pointer'} className='delete_list'  />
        </Flex>
      </CardHeader>
      <CardBody mt={'-10'}>
        {loading ? <Spinner thickness='3px' color='darkGray' emptyColor='gray.200' /> : null}
        {!loading ? <CardsContainer list={name} cards={data} /> : null}
      </CardBody>
      <CardFooter mt={'-10'}>
        <Flex direction={'column'} w={'100%'}>
       
          {!loading ? <CollapseText closeOutsideRef={ref} addCard={addCard} handleInputChange={handleInputChange} toggleForm={toggleForm} /> : null}
        </Flex>
      </CardFooter>
    </Card>
  )
}

export default List

