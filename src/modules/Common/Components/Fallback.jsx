import { Alert ,AlertIcon,AlertTitle,AlertDescription } from '@chakra-ui/react'
import React from 'react'

const Fallback = () => {
  return (
    <Alert status="error" variant={'subtle'} h={'100vh'}
    flexDirection='column'
    alignItems='center'
    // justifyContent='center'
    textAlign='center'>
      <AlertIcon boxSize={'80px'} />
      <AlertTitle fontWeight={'bold'} mt={'8'} fontSize={'4xl'}>Error</AlertTitle>
      <AlertDescription fontSize={'3xl'} mt={'10'}>Oops! We ran into some trouble,please try again.</AlertDescription>
    </Alert>
  );
};


export default Fallback
