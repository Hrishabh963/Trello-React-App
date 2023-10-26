import {
  Box,
  CardHeader,
  Heading,
  Card,
  useDisclosure,
  Flex,
  useOutsideClick,
} from "@chakra-ui/react";
import { useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import List from "./List";
import CollapseForm from "./CollapseForm";
import { getListData,postListData,getParentData,deleteList } from "../Utils/ListApi";
import { listContainerReducer,listContainerInitalState } from "../Utils/listHelper";
import Loader from "../../Common/Components/Loader";
import { useErrorBoundary } from "react-error-boundary";

const ListContainer = () => { 
  //Getting board id
  const { id } = useParams();
  //Using useReducer to handle API fetching and state change 
  const [state, dispatch] = useReducer(listContainerReducer, listContainerInitalState);
  const { isOpen, onToggle } = useDisclosure();
  const {showBoundary} = useErrorBoundary();
  const ref = useRef();
  useOutsideClick({
    ref: ref,
    handler: () => {
      if(isOpen){
        onToggle();
      }
    }
  })
  //Function to add list to the board
  const addList = ()=>{
    if(state.inputValue === '') return;
    postListData(state.inputValue,id)
    .then((data)=>{
      dispatch({type:'post',payload:data})
    })
    .catch((error)=>{
      showBoundary(error);
      
    })
    dispatch({type:'setInput',payload:''})
  }

  //Function to handle the change in input field
  const handleInputChange = (value)=>{
    dispatch({type:'setInput',payload:value})
  }

  //Function to delete list from board
  const handleDelete = (event)=>{
    const trigger = event.target.closest('.delete_list');
    if(!trigger) return;
    const listId = trigger.id;
    deleteList(listId)
    .then((data)=>{
      dispatch({type:'delete',payload:data.id});
    })
    .catch((error)=>{
      showBoundary(error);
    })
  }

  //Fetching data to display
  useEffect(() => {
    getListData(id)
      .then((data) => {
        dispatch({ type: "fetch", payload: data });
      })
      .catch((error) => {
        showBoundary(error);
      });
    getParentData(id)
    .then((data)=>{
      dispatch({type:'setColor',payload:data})
    })
    .catch((error)=>{
      showBoundary(error);
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
        {state.loading ? <Loader />: null}
        {!state.loading
          ? state.data.map((list) => {
              return <List key={list.id} id={list.id} name={list.name} />;
            })
          : null}
        {!state.loading ? <Card
          display={isOpen?'none':'flex'}
          h={"fit-content"}
          w={"20rem"}
          opacity={"0.7"}
          borderRadius={"2xl"}
          cursor={"pointer"}
        >
          <CardHeader onClick={onToggle}>Add another list...</CardHeader>
        </Card> : null}
        {isOpen ? <CollapseForm clickOutRef={ref} onToggle={onToggle} addList={addList} handleInputChange={handleInputChange} /> : null}
      </Flex>
    </Box>
  );
};

export default ListContainer;

