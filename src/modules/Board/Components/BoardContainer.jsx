import { Box, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect} from "react";
import Board from "./Board";
import { useNavigate } from "react-router-dom";
import ModalForm from "./ModalForm";
import { getBoards,postBoard } from "./BoardApi";
import Loader from "../../Common/Components/Loader";
import { useErrorBoundary } from "react-error-boundary";
import { useDispatch,useSelector } from "react-redux";
import {action} from '../../../store/features/boardSlice'

const BoardContainer = () => {
  //Error boundary custom hook
  const { showBoundary } = useErrorBoundary();
  
  //Custom hook provided by chakra to manage modals/popovers
  const {isOpen,onOpen,onClose} = useDisclosure();
  const navigate = useNavigate();
  const {data,loading,input} = useSelector((state)=> state.board);   //Using useSelector to get my current state
  const dispatch = useDispatch();   //Dispatches types to relevent reducers

  //function to handle the navigation
  const handleNavigate = (event) => {
    const trigger = event.target.closest(".boards");
    if (!trigger) return;
    navigate(`/board/${trigger.id}`);
  };

  const handleInput = (value)=>{
    dispatch(action.setInput(value));
  }

  const addBoard = ()=>{
    if(input === '') return;
    postBoard(input)
    .then((data)=>{
      dispatch(action.postBoard(data));
      dispatch(action.setInput(''));
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
        dispatch(action.getAllBoards(data));
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
      {loading ? <Loader /> : null}
      {data ? (
        data.map((board) => {
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
      {!loading && data ? <Box h={'10rem'} display={'flex'} alignItems={{base:'flex-start',md:'center'}} p={{base:'3',md:'0'}} onClick={onOpen} justifyContent={'center'} bgColor={'#091e4224'} borderRadius={'2xl'} _hover={{bgColor:'#091E424F'}}>
        <Text fontSize={'base'}>Create new board</Text>
      </Box> : null}
      <ModalForm input={input} handleInput={handleInput} isOpen={isOpen} onClose={onClose} postBoard={addBoard} />
    </SimpleGrid>
  );
};

export default BoardContainer;
