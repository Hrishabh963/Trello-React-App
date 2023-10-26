import { Box, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect,useReducer} from "react";
import Board from "./Board";
import { useNavigate } from "react-router-dom";
import ModalForm from "./ModalForm";
import { getBoards,postBoard } from "../Utils/BoardApi";
import { reducer,initalState } from "../Utils/boardHelper";
import Loader from "../../Common/Components/Loader";
import { useErrorBoundary } from "react-error-boundary";

const BoardContainer = () => {
  const { showBoundary } = useErrorBoundary();
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
      dispatcher({type:'post',payload:data});
      dispatcher({type:'setInput',payload:''});
    })
    .catch((error)=>{
      showBoundary(error);
    })
    onClose();
  }


  //Fetching all data
  useEffect(()=>{
    getBoards(showBoundary)
    .then((data)=>{
        dispatcher({type:'fetch',payload:data});
    })
    .catch((error)=>{
      showBoundary(error);
    })
  },[])

  return (
    <SimpleGrid
      py={"4rem"}
      px={"3rem"}
      spacing='60px'
      onClick={handleNavigate}
      columns={{base:'1',md:'2',lg:'4'}}
    >
      {state.loading ? <Loader /> : null}
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
      ) : null}
      {!state.loading && state.data ? <Box h={'10rem'} display={'flex'} alignItems={{base:'flex-start',md:'center'}} p={{base:'3',md:'0'}} onClick={onOpen} justifyContent={'center'} bgColor={'#091e4224'} borderRadius={'2xl'} _hover={{bgColor:'#091E424F'}}>
        <Text fontSize={'base'}>Create new board</Text>
      </Box> : null}
      <ModalForm input={state.input} handleInput={handleInput} isOpen={isOpen} onClose={onClose} postBoard={addBoard} />
    </SimpleGrid>
  );
};

export default BoardContainer;
