import { Flex} from '@chakra-ui/react'
import React from 'react'
import Card from './Card'

const CardsContainer = ({list='',cards = [],handleCardDelete}) => {
  return (
    <Flex direction={'column'}>
        {cards.map((card)=>{
          return(
          <Card list={list} key={card.id} handleCardDelete={handleCardDelete} id={card.id} name={card.name} />
          )
        })}
    </Flex>
  )
}

export default CardsContainer
