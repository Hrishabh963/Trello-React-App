import { DeleteIcon } from '@chakra-ui/icons'
import { Card, CardBody, CardFooter, CardHeader, IconButton ,Flex, Text, Spinner} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import CardsContainer from '../../Card/Components/CardsContainer'
import CollapseText from './CollapseText'
import { getCards, postCard, deleteCard } from '../Utils/CardApi'
import { useErrorBoundary } from 'react-error-boundary'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../store/features/cardsSlice'

const List = ({name = '' , id='', handleDelete}) => {
  const {showBoundary} = useErrorBoundary();
  const {data,loading} = useSelector((state)=> state.cards)
  const cardData = data[id];
  const dispatch = useDispatch();

  //Function to handle event propagation and send id to be deleted
  const handleListDelete = (event)=>{
    event.stopPropagation();
    handleDelete(id);
    }

  //Function to handle card deletion
  const handleCardDelete = (cardId)=>{
    deleteCard(cardId)
    .then(()=>{
      dispatch(actions.deleteCard({listId : id, cardId : cardId}));
    })
    .catch((error)=>{
      showBoundary(error);
    })
  }

  //
  const addCard = (inputValue) =>{
    if(inputValue === '')return;
    postCard(inputValue,id)
    .then((data)=>{
      dispatch(actions.postCard({listId:id,cardData:data}));
    })
    .catch((error)=>{
      showBoundary(error);
    })
    
  }

  useEffect(()=>{
    getCards(id)
    .then((data)=>{
      dispatch(actions.getCards({listId : id,cardsData : data}));
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
        <IconButton onClick={handleListDelete}  _hover={{color:'red'}}  icon={<DeleteIcon />} mt={'-2'} cursor={'pointer'} className='delete_list'  />
        </Flex>
      </CardHeader>
      <CardBody mt={'-10'}>
        {loading ? <Spinner thickness='3px' color='darkGray' emptyColor='gray.200' /> : null}
        {!loading ? <CardsContainer handleCardDelete={handleCardDelete} list={name} cards={cardData} /> : null}
      </CardBody>
      <CardFooter mt={'-10'}>
        <Flex direction={'column'} w={'100%'}>
          {!loading ? <CollapseText addCard={addCard} /> : null}
        </Flex>
      </CardFooter>
    </Card>
  )
}

export default List

