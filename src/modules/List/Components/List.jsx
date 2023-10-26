import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, CardFooter, CardHeader, IconButton ,Flex, Text, CloseButton, Box} from '@chakra-ui/react'
import React, { useEffect, useReducer } from 'react'
import CardsContainer from '../../Card/Components/CardsContainer'
import CollapseText from './CollapseText'
import { getCards, postCard, deleteCard } from '../Utils/ListApi'
import { listReducer , listInitalState} from '../Utils/listHelper'
import { useErrorBoundary } from 'react-error-boundary'


const List = ({name = '' , id=''}) => {
  const [state, dispatcher] = useReducer(listReducer, listInitalState);
  const {showBoundary} = useErrorBoundary();

  const toggleForm = ()=>{
    dispatcher({type :'showForm'})
  }

  const handleInputChange = (value)=>{
    dispatcher({type:'setInput',payload:value});
  }

  const handleDelete = (event)=>{
    const trigger = event.target.closest('.delete_card');
    if(!trigger) return;
    const triggerId = trigger.id;
    deleteCard(triggerId)
    .then((status)=>{
      if(status === 200){
        dispatcher({type:'deleteCard',payload:triggerId})
      }
    })
    .catch(error=>{
      showBoundary(error)
      dispatcher({type:'error'});
    })
  }

  const addCard = ()=>{
    if(state.inputValue === '')return;
    postCard(state.inputValue,id)
    .then((data)=>{
      dispatcher({type:'post',payload:{id:data.id,name:data.name}});
      dispatcher({type:'setInput',payload:''});
    })
    .catch((error)=>{
      showBoundary(error);
      dispatcher({type:'error'})
    })
    
  }

  useEffect(()=>{
    getCards(id)
    .then((data)=>{
      dispatcher({type:'fetch',payload:data});
    })
    .catch((error)=>{
      showBoundary(error);
      dispatcher({type : 'error'})
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
        <CardsContainer list={name} cards={state.cards} />
      </CardBody>
      <CardFooter mt={'-10'}>
        <Flex direction={'column'} w={'100%'}>
        <Button display={state.showForm ? 'none' : 'flex'}  cursor={'pointer' } onClick={toggleForm} _hover={{backgroundColor:'#091E4224'}} w={'50%'} fontSize={'0.8rem'}><AddIcon /><Text pl={'0.7rem'}>Add new card</Text></Button>
          {state.showForm ? <CollapseText addCard={addCard} handleInputChange={handleInputChange} toggleForm={toggleForm} /> : null}
        </Flex>
      </CardFooter>
    </Card>
  )
}

export default List

