import { Box, Modal, ModalBody,ModalOverlay,ModalHeader ,ModalCloseButton, ModalContent, SimpleGrid, Text, useDisclosure, Input, Button, Flex } from "@chakra-ui/react";
import { useEffect,useReducer,useState} from "react";
import Board from "./Board";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ModalForm from "./ModalForm";
const key = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_API_TOKEN;
const initalState = {
  data: undefined,
  error: false,
  loading: true,
  input : ''
};

const BoardContainer = () => {
  const {isOpen,onOpen,onClose} = useDisclosure();
  const [input,setInput] = useState('');
  const [state, dispatcher] = useReducer(reducer, initalState);
  console.log(state);
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
      <ModalForm input={input} handleInput={handleInput} isOpen={isOpen} onClose={onClose} postBoard={postBoard} />
    </SimpleGrid>
  );
};

export default BoardContainer;

const getBoards = async () => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/boards?fields=name,id,prefs&key=${
        key
      }&token=${token}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch": {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    }
    case "error": {
      return {
        data: undefined,
        loading: false,
        error: "Something went wrong",
      };
    }
    case "post" :{ 
      return {
        data: [...state.data,action.payload],
        loading:false,
        error:false
      }
    }
    default:
      return state;
  }
};
