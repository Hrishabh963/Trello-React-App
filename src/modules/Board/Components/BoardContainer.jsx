import { Heading } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useReducer} from 'react'

const BoardContainer = () => {
  const initalState = {
    data:undefined,
    error:false,
    loading:true
  };

  //Using useReducer to handle fetch logic
  const [state,dispatcher] = useReducer(reducer,initalState);
  
  useEffect(()=>{
    getBoards()
    .then((data)=>{
      dispatcher({type:'fetch',payload:data});
    })
    .catch((error)=>{
      console.error(error);
      dispatcher({type:'error'});
    })
  },[])
  
  return (
    <div>
      {state.data && state.data.map((board)=>{
        console.log(board);
      })}
    </div>
  )
}

export default BoardContainer

const getBoards = async ()=>{
  try {
    const response = await axios.get(`https://api.trello.com/1/members/me/boards?fields=name,id,prefs&key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`);
    return  response.data;    
  } catch (error) {
    throw error;
  }
  }

const reducer = (state,action)=>{
  switch(action.type){
    case 'fetch' : {
      return {
        ...boardData,
         data : action.payload,
         loading:false
      }
    }
    case 'error' : {
      return {
        data : undefined,
        loading: false,
        error:'Something went wrong'
      }
    }
    default :
     return state;
  }
}