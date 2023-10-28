import {
  Box,
  Flex,
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
  const {data,loading,bgColor,bgImg} = useSelector((state)=> state.lists)  //Loading lists data from store
  const boardColor = bgColor ? bgColor : '';  //Defining color
  const imgUrl =bgImg ? bgImg : '';           //Defining img
  const dispatch = useDispatch()               
  const {showBoundary} = useErrorBoundary();   

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


  //Function to delete list from board
  const handleDelete = (id)=>{
    deleteList(id)
    .then((data)=>{
      dispatch(actions.deleteList(data.id));
    })
    .catch((error)=>{
      showBoundary(error);
    })
  }

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
              return <List key={list.id} id={list.id} name={list.name} handleDelete={handleDelete} />;
            })
          : null}
        {!loading ? <CollapseForm addList={addList} />:null}
      </Flex>
    </Box>
  );
};

export default ListContainer;

