import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, CardFooter, CardHeader, IconButton ,Flex, Text, Spinner, useOutsideClick} from '@chakra-ui/react'
import React, { useEffect, useReducer, useRef } from 'react'
import CardsContainer from '../../Card/Components/CardsContainer'
import CollapseText from './CollapseText'
import { getCards, postCard, deleteCard } from '../Utils/ListApi'
import { listReducer , listInitalState} from '../Utils/listHelper'
import { useErrorBoundary } from 'react-error-boundary'


const List = ({name = '' , id=''}) => {
  const [state, dispatch] = useReducer(listReducer, listInitalState);
  const {showBoundary} = useErrorBoundary();
  const ref = useRef()
  useOutsideClick({
    ref:ref,
    handler : ()=>{
      if(state.showForm){
        dispatch({type:'showForm'})
      }
    }
  })
  const toggleForm = ()=>{
    dispatch({type :'showForm'})
  }

  const handleInputChange = (value)=>{
    dispatch({type:'setInput',payload:value});
  }

  const handleDelete = (event)=>{
    const trigger = event.target.closest('.delete_card');
    if(!trigger) return;
    const triggerId = trigger.id;
    deleteCard(triggerId)
    .then((status)=>{
      if(status === 200){
        dispatch({type:'deleteCard',payload:triggerId})
      }
    })
    .catch(error=>{
      showBoundary(error)
    })
  }

  const addCard = ()=>{
    if(state.inputValue === '')return;
    postCard(state.inputValue,id)
    .then((data)=>{
      dispatch({type:'post',payload:{id:data.id,name:data.name}});
      dispatch({type:'setInput',payload:''});
    })
    .catch((error)=>{
      showBoundary(error);
    })
    
  }

  useEffect(()=>{
    getCards(id)
    .then((data)=>{
      dispatch({type:'fetch',payload:data});
    })
    .catch((error)=>{
      showBoundary(error);
    })
  },[])

  return (
    <Card backgroundColor={'#f1f2f4'} h={'fit-content'} w={'20rem'} borderRadius={'2xl'} onClick={handleDelete}>
      <CardHeader fontWeight={'bold'} fontSize={'0.9rem'}>
        <Flex w={'100%'} justifyContent={'space-between'}>
        <Text>{name}</Text>
        <IconButton id={id} _hover={{color:'red'}}  icon={<DeleteIcon />} mt={'-2'} cursor={'pointer'} className='delete_list'  />
        </Flex>
      </CardHeader>
      <CardBody mt={'-10'}>
        {state.loading ? <Spinner thickness='3px' color='darkGray' emptyColor='gray.200' /> : null}
        {!state.loading ? <CardsContainer list={name} cards={state.cards} /> : null}
      </CardBody>
      <CardFooter mt={'-10'}>
        <Flex direction={'column'} w={'100%'}>
        <Button display={state.showForm ? 'none' : 'flex'}  cursor={'pointer' } onClick={toggleForm} _hover={{backgroundColor:'#091E4224'}} w={'50%'} fontSize={'0.8rem'}><AddIcon /><Text pl={'0.7rem'}>Add new card</Text></Button>
          {state.showForm ? <CollapseText closeOutsideRef={ref} addCard={addCard} handleInputChange={handleInputChange} toggleForm={toggleForm} /> : null}
        </Flex>
      </CardFooter>
    </Card>
  )
}

export default List

