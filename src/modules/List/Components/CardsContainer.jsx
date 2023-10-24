import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const CardsContainer = ({cards = []}) => {
  return (
    <Flex direction={'column'}>
        {cards.map((card)=>{
          return(
          <Flex my={'0.2rem'} id={card.id} bg={'#FFFFFF'} width={'100%'} alignItems={'center'} h={'10'} borderRadius={'lg'} boxShadow="inset 0 0 1px rgba(0, 0, 0, 0.5)">
            <Text fontSize={'sm'} pl={'1rem'}> {card.name} </Text>
          </Flex>
          )
        })}
    </Flex>
  )
}

export default CardsContainer
