import {
  Box,
  CardHeader,
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
import Loader from "../../Common/Components/Loader";
import { useErrorBoundary } from "react-error-boundary";
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {actions} from '../../../store/features/listSlice';

const ListContainer = () => { 
  //Getting board id
  const { id } = useParams();
  const {data,loading,bgColor,bgImg} = useSelector((state)=> state.lists)
  const boardColor = bgColor ? bgColor : '';
  const imgUrl =bgImg ? bgImg : '';
  const dispatch = useDispatch()
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
  const addList = (input)=>{
    if(input === '') return;
    postListData(input,id)
    .then((data)=>{
      dispatch(actions.postList(data));
    })
    .catch((error)=>{
      showBoundary(error);
    })
  }

  //Function to handle the change in input field

  //Function to delete list from board
  // const handleDelete = (event)=>{
  //   const trigger = event.target.closest('.delete_list');
  //   if(!trigger) return;
  //   const listId = trigger.id;
  //   deleteList(listId)
  //   .then((data)=>{
  //     dispatch({type:'delete',payload:data.id});
  //   })
  //   .catch((error)=>{
  //     showBoundary(error);
  //   })
  // }

  //Fetching data to display
  useEffect(() => {
    getListData(id)
      .then((data) => {
        dispatch(actions.getLists(data));
      })
      .catch((error) => {
        showBoundary(error);
      });
    getParentData(id)
    .then((data)=>{
      dispatch(actions.setBackground(data));
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
      bgColor={boardColor}
      backgroundImage={imgUrl}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}

    >
      <Flex minW={"fit-content"} spacing={"10"} gap={'2rem'}>
        {loading ? <Loader />: null}
        {!loading
          ? data.map((list) => {
              return <List key={list.id} id={list.id} name={list.name} />;
            })
          : null}
        {!loading ? <Card
          display={isOpen?'none':'flex'}
          h={"fit-content"}
          w={"20rem"}
          opacity={"0.7"}
          borderRadius={"2xl"}
          cursor={"pointer"}
        >
          <CardHeader onClick={onToggle}>Add another list...</CardHeader>
        </Card> : null}
        {isOpen ? <CollapseForm clickOutRef={ref} onToggle={onToggle} addList={addList} /> : null}
      </Flex>
    </Box>
  );
};

export default ListContainer;

