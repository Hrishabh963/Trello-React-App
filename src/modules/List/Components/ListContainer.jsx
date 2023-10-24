import {
  Box,
  CardHeader,
  HStack,
  Heading,
  Card,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import List from "./List";
import CollapseForm from "./CollapseForm";
const ListContainer = ({ color = undefined, url = "undefined" }) => {
  const initalState = {
    data: undefined,
    error: false,
    loading: true,
  };

  const { id } = useParams();

  //Using useReducer to handle API fetching
  const [state, dispatcher] = useReducer(reducer, initalState);
  const { isOpen, onToggle } = useDisclosure();

  //Fetching data to display
  useEffect(() => {
    getListData(id)
      .then((data) => {
        dispatcher({ type: "fetch", payload: data });
      })
      .catch((error) => {
        dispatcher({ type: error });
      });
  }, []);
  return (
    <Box
      maxW="100%"
      px={"2rem"}
      pt={"1rem"}
      minH={"100vh"}
      overflowX="auto"
      bgColor={color}
      bgImage={url}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
    >
      <HStack minW={"fit-content"} spacing={"10"}>
        {!state.error && state.loading ? <Heading>Loading</Heading> : null}
        {!state.error && !state.loading
          ? state.data.map((list) => {
              return <List key={list.id} id={list.id} name={list.name} />;
            })
          : null}
        <Card
          display={isOpen?'none':'flex'}
          minH={"fit-content"}
          mt={"-8rem"}
          w={"20rem"}
          opacity={"0.7"}
          borderRadius={"2xl"}
          cursor={"pointer"}
        >
          <CardHeader onClick={onToggle}>Add another list</CardHeader>
        </Card>
        <CollapseForm isOpen={isOpen} onToggle={onToggle} />
      </HStack>
    </Box>
  );
};

export default ListContainer;

const postData = async (name,id)=>{
  if(name === '')return;
  try {
    const response = await axios.post(`https://api.trello.com/1/lists?name=${name}&idBoard=${id}&key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`)
  } catch (error) {
    throw error;
  }
}
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


const reducer = (state, action) => {
  switch (action.type) {
    case "fetch": {
      return {
        data: action.payload,
        error: false,
        loading: false,
      };
    }
    case "error": {
      return {
        data: undefined,
        error: true,
        loading: false,
      };
    }
    case "post": {
      return {
        data : [...state.data,action.payload],
        error:false,
        loading:false
      }
    }
    default:
      return state;
  }
};
