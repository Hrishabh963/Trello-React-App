import { SimpleGrid} from "@chakra-ui/react";
import { useEffect} from "react";
import Board from "./Board";
import ModalForm from "./ModalForm";
import Loader from "../../Common/Components/Loader";
import { useErrorBoundary } from "react-error-boundary";
import { useDispatch,useSelector } from "react-redux";
import {fetchBoards, postBoard } from "../../../store/features/boardSlice";

const BoardContainer = () => {
  //Error boundary custom hook
  const { showBoundary } = useErrorBoundary();
  
  const {data,loading,error} = useSelector((state)=> state.board);   //Using useSelector to get my current state
  const dispatch = useDispatch();     //Dispatches types to relevent reducers
  if(error) showBoundary(error); 

  //Function to add new board
  const addBoard = (input)=>{
    if(input === '') return;
    dispatch(postBoard(input));
  }


  //Fetching all data
  useEffect(()=>{
    dispatch(fetchBoards());
  },[])

  return (
    <SimpleGrid
      py={"4rem"}
      px={"3rem"}
      spacing='60px'
      columns={{base:'1',md:'2',lg:'4'}}
    >
      {loading ? <Loader /> : null}
      { !loading &&
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
      }
      {!loading ? <ModalForm postBoard={addBoard} /> : null}
    </SimpleGrid>
  );
};

export default BoardContainer;
