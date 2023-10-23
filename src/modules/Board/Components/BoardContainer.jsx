import { Box, Modal, ModalBody,ModalOverlay,ModalHeader ,ModalCloseButton, ModalContent, SimpleGrid, Text, useDisclosure, Input, Button, Flex } from "@chakra-ui/react";
import { useContext,useEffect,useState} from "react";
import Board from "./Board";
import { useNavigate } from "react-router-dom";
import { BoardsContext } from "../../Common/BoardContextProvider";
import axios from "axios";
import ModalForm from "./ModalForm";

const BoardContainer = () => {
  const {isOpen,onOpen,onClose} = useDisclosure();
  const {state,dispatcher} = useContext(BoardsContext);
  const [input,setInput] = useState('');
  const navigate = useNavigate();
  const handleNavigate = (event) => {
    const trigger = event.target.closest(".boards");
    if (!trigger) return;
    navigate(`/board/${trigger.id}`);
  };

  const handleInput = (value)=>{
    setInput(value);
  }

  const postBoard = async () =>{
    const response = await axios.post(`https://api.trello.com/1/boards/?name=${input}&key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`);
    dispatcher({type:'post',payload:response.data});
    onClose();
  }
  return (
    <SimpleGrid
      py={"4rem"}
      px={"3rem"}
      minChildWidth='20rem'
      spacing='60px'
      onClick={handleNavigate}
    >
      {state.data ? (
        state.data.map((board) => {
          return (
            <Board
              url={board.prefs.backgroundImage}
              key={board.id}
              id={board.id}
              color={board.prefs.backgroundColor}
              name={board.name}
            />
          );
        })
      ) : (
        <h1>loading</h1>
      )}
      {state ? <Box h={'10rem'} display={'flex'} alignItems={'center'} onClick={onOpen} justifyContent={'center'} bgColor={'#091e4224'} borderRadius={'2xl'} _hover={{bgColor:'#091E424F'}}>
        <Text fontSize={'base'}>Create new board</Text>
      </Box> : null}
      <ModalForm input={input} handleInput={handleInput} isOpen={isOpen} onClose={onClose} postBoard={postBoard} />
    </SimpleGrid>
  );
};

export default BoardContainer;
