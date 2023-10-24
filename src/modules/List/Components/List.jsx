import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Button, Card, CardBody, CardFooter, CardHeader, IconButton ,Flex, Text, CloseButton, Box} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useReducer } from 'react'
import CardsContainer from './CardsContainer'
import CollapseText from './CollapseText'

const initalState = {
  cards : [],
  error : false,
  loading : true,
  showForm : false,
  inputValue: ''
}

const List = ({name = '' , id=''}) => {
  const [state, dispatcher] = useReducer(reducer, initalState);
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
      console.log(error)
      dispatcher({type:'error'});
    })
  }

  const addCard = ()=>{
    if(state.inputValue === '')return;
    postCard(state.inputValue,id)
    .then((data)=>{
      dispatcher({type:'post',payload:{id:data.id,name:data.name,idChecklists : data.idChecklists}});
    })
    dispatcher({type:'setInput',payload:''});
  }

  useEffect(()=>{
    getCards(id)
    .then((data)=>{
      dispatcher({type:'fetch',payload:data});
    })
    .catch((error)=>{
      console.log(error);
      dispatcher({type : 'error'})
    })
  },[])

  return (
    <Card backgroundColor={'#f1f2f4'} h={'fit-content'} w={'20rem'} borderRadius={'2xl'} onClick={handleDelete}>
      <CardHeader fontWeight={'bold'} fontSize={'0.9rem'}>
        <Flex w={'100%'} justifyContent={'space-between'}>
        <Text>{name}</Text>
        <IconButton id={id} icon={<DeleteIcon />} mt={'-2'} cursor={'pointer'} className='delete_list'  />
        </Flex>
      </CardHeader>
      <CardBody mt={'-10'}>
        <CardsContainer cards={state.cards} />
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

const getCards = async (id)=>{
try {
    const response = await axios.get(`https://api.trello.com/1/lists/${id}/cards?key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}&fields=name,idChecklists`);
    return  response.data;
} catch (error) {
    throw error;
}
}
const postCard = async (name,id)=>{
  console.log(name,id);
  try {
    const response = await axios.post(`https://api.trello.com/1/cards?idList=${id}&name=${name}&key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`)
    return response.data;
  } catch (error) {
    throw error;
  }
}

const deleteCard = async (id)=>{
  try {
    const response = await axios.delete(`https://api.trello.com/1/cards/${id}?key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`);
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
        cards : action.payload,
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
        cards:[...state.cards,action.payload]
      }
    }
    case "deleteCard":{
      return{
        ...state,
        cards:state.cards.filter((card)=>card.id!==action.payload)
      }
    }
    case "showForm":{
      return {
        ...state,
        showForm : !state.showForm
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