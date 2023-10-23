import { HStack,Box, Heading} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
const ListContainer = () => {
  const initalState = {
    data : undefined,
    error : false,
    loading : true
  };

  const{id} = useParams();

  //Using useReducer to handle API fetching
  const [state,dispatcher] = useReducer(reducer,initalState);

  useEffect(()=>{
    getListData(id)
    .then((data)=>{
      dispatcher({type:'fetch',payload:data});
    })
    .catch((error)=>{
      dispatcher({type:error});
    })
  },[])
  return (
    <HStack spacing={'28'}>
      {!state.error && state.loading ? <Heading>Loading</Heading> : null}
      {!state.error && !state.loading ? state.data.map((list)=>{
        return <Box>{list.name}</Box>
      }) : null}
    </HStack>
  );
};

export default ListContainer;

const getListData = async (id)=>{
  try{
    const response = await axios.get(`https://api.trello.com/1/boards/${id}/lists?key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`)
    return response.data;
  }catch(error){
    throw error;
  }
}

const reducer = (state,action) =>{
  switch(action.type){
    case 'fetch':{
      return {
        data : action.payload,
        error : false,
        loading : false
      }
    }
    case 'error':{
      return {
        data : undefined,
        error : true,
        loading : false
      }
    }
    default:
      return state;
  }
}