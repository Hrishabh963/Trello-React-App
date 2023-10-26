import { Box, Container, Heading, keyframes } from '@chakra-ui/react';
import React from 'react';
const spin = keyframes`  
  from {transform: rotate(0deg);}   
  to {transform: rotate(360deg)} 
`;
const Loader = () => {
    const spinAnimation = `${spin} infinite 2s linear`; 
  return (
    <Container display="flex" flexDirection="row">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        
      >
        <Box
          w="100px"
          h="100px"
          bgImage="url('/assets/loading.png')" // Replace with your image path
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
          borderRadius="50%"
          animation={spinAnimation}
          />
        <Heading>Loading</Heading>
      </Box>
    </Container>
  );
};

export default Loader;
