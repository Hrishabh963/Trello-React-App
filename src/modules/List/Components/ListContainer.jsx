import {
  Box,
  CardHeader,
  Heading,
  Card,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import List from "./List";
import CollapseForm from "./CollapseForm";

const initalState = {
  data: undefined,
  error: false,
  loading: true,
  boardColor:undefined,
  imgUrl:undefined,
  inputValue:''
};

const ListContainer = () => { 
  //Getting board id
  const { id } = useParams();

  //Function to add list to the board
  const addList = ()=>{
    if(state.inputValue === '') return;
    postData(state.inputValue,id)
    .then((data)=>{
      dispatcher({type:'post',payload:data})
    })
    .catch((error)=>{
      console.log(error);
      dispatcher({type:'error'})
    })
    dispatcher({type:'setInput',payload:''})
  }

  //Function to handle the change in input field
  const handleInputChange = (value)=>{
    dispatcher({type:'setInput',payload:value})
  }

  //Function to delete list from board
  const handleDelete = (event)=>{
    const trigger = event.target.closest('.delete_list');
    if(!trigger) return;
    const listId = trigger.id;
    deleteList(listId)
    .then((data)=>{
      dispatcher({type:'delete',payload:data.id});
    })
    .catch((error)=>{
      console.log(error);
      dispatcher({type:'error'})
    })
  }

  //Using useReducer to handle API fetching
  const [state, dispatcher] = useReducer(reducer, initalState);
  console.log(state);
  const { isOpen, onToggle } = useDisclosure();

  //Fetching data to display
  useEffect(() => {
    getListData(id)
      .then((data) => {
        dispatcher({ type: "fetch", payload: data });
      })
      .catch((error) => {
        console.log(error);
        dispatcher({ type: 'error' });
      });
    getParentData(id)
    .then((data)=>{
      dispatcher({type:'setColor',payload:data})
    })
    .catch((error)=>{
      console.log(error);
      dispatcher({ type: 'error' });
    })
  }, []);

  //Rendering jsx logic
  return (
    <Box
      maxW="100%"
      px={"2rem"}
      pt={"1rem"}
      minH={"100vh"}
      overflowX="auto"
      bgColor={state.boardColor}
      backgroundImage={state.imgUrl}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}

    >
      <Flex minW={"fit-content"} spacing={"10"} onClick={handleDelete} gap={'2rem'}>
        {!state.error && state.loading ? <Heading>Loading</Heading> : null}
        {!state.error && !state.loading
          ? state.data.map((list) => {
              return <List key={list.id} id={list.id} name={list.name} />;
            })
          : null}
        <Card
          display={isOpen?'none':'flex'}
          h={"fit-content"}
          w={"20rem"}
          opacity={"0.7"}
          borderRadius={"2xl"}
          cursor={"pointer"}
        >
          <CardHeader onClick={onToggle}>Add another list...</CardHeader>
        </Card>
        {isOpen ? <CollapseForm onToggle={onToggle} addList={addList} handleInputChange={handleInputChange} /> : null}
      </Flex>
    </Box>
  );
};

export default ListContainer;

//Function to post list
const postData = async (name,id)=>{
  if(name === '')return;
  try {
    const response = await axios.post(`https://api.trello.com/1/lists?name=${name}&idBoard=${id}&key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Function to get all list
const getListData = async (id) => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/boards/${id}/lists?key=${
        import.meta.env.VITE_API_KEY
      }&token=${import.meta.env.VITE_API_TOKEN}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

///Function to get parent board's color/bgImage
const getParentData = async (id) => {
  try {
    const response = await axios.get(`https://api.trello.com/1/boards/${id}?fields=name,id,prefs&key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`);
    return response.data.prefs;
  } catch (error) {
    throw error;
  }
}

const deleteList = async (listId)=>{
  try {
    const response = await axios.put(`https://api.trello.com/1/lists/${listId}/closed?key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}&value=true`)
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Reducer function to be passed in useReducer

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch": {
      return {
        ...state,
        data: action.payload,
        error: false,
        loading: false,
      };
    }
    case "error": {
      return {
        ...state,
        data: undefined,
        error: true,
        loading: false,
      };
    }
    case "post": {
      return {
        ...state,
        data : [...state.data,action.payload],
        error:false,
        loading:false
      }
    }
    case "delete":{
      return {
        ...state,
        data: state.data.filter(list=> list.id !== action.payload)
      }
    }
    case "setColor":{
      return {
        ...state,
        boardColor:action.payload.backgroundColor,
        imgUrl:action.payload.backgroundImage
      }
    }
    case "setInput":{
      return {
        ...state,
        inputValue:action.payload
      }
    }
    default:
      return state;
  }
};

