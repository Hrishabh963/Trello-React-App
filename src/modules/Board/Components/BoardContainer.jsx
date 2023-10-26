import { Box, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect,useReducer} from "react";
import Board from "./Board";
import { useNavigate } from "react-router-dom";
import ModalForm from "./ModalForm";
import { getBoards,postBoard } from "../Utils/BoardApi";
import { reducer,initalState } from "../Utils/boardHelper";

const BoardContainer = () => {
  const {isOpen,onOpen,onClose} = useDisclosure();
  const [state, dispatcher] = useReducer(reducer, initalState);
  const navigate = useNavigate();

  const handleNavigate = (event) => {
    const trigger = event.target.closest(".boards");
    if (!trigger) return;
    navigate(`/board/${trigger.id}`);
  };

  const handleInput = (value)=>{
    dispatcher({type:'setInput',payload:value});
  }

  const addBoard = ()=>{
    if(state.input === '') return;
    postBoard(state.input)
    .then((data)=>{
      console.log(data);
      dispatcher({type:'post',payload:data});Set
      dispatcher({type:'setInput',payload:''});
    })
    .catch((error)=>{
      console.log(error);
      dispatcher({type:'error'});
    })
    onClose();
  }


  //Fetching all data
  useEffect(()=>{
    getBoards()
    .then((data)=>{
        dispatcher({type:'fetch',payload:data});
    })
    .catch((error)=>{
        dispatcher({type:'error'});
    })
  },[])

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
      {state.data ? <Box h={'10rem'} display={'flex'} alignItems={'center'} onClick={onOpen} justifyContent={'center'} bgColor={'#091e4224'} borderRadius={'2xl'} _hover={{bgColor:'#091E424F'}}>
        <Text fontSize={'base'}>Create new board</Text>
      </Box> : null}
      <ModalForm input={state.input} handleInput={handleInput} isOpen={isOpen} onClose={onClose} postBoard={addBoard} />
    </SimpleGrid>
  );
};

export default BoardContainer;
