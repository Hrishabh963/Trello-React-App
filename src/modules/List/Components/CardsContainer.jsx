import { Flex} from '@chakra-ui/react'
import React from 'react'
import Card from './Card'

const CardsContainer = ({list='',cards = []}) => {
  return (
    <Flex direction={'column'}>
        {cards.map((card)=>{
          return(
          <Card list={list} key={card.id} id={card.id} name={card.name} />
          )
        })}
    </Flex>
  )
}

export default CardsContainer
