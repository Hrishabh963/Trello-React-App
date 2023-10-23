import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
const key = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_API_TOKEN;
const BoardsContext = createContext();

const initalState = {
    data: undefined,
    error: false,
    loading: true,
  };

const BoardsContextProvider = ({children})=>{
  //Using useReducer to handle fetch logic
  const [state, dispatcher] = useReducer(reducer, initalState);

  useEffect(()=>{
    getBoards()
    .then((data)=>{
        dispatcher({type:'fetch',payload:data});
    })
    .catch((error)=>{
        dispatcher({type:'error'});
    })
  },[])
  const values = {state,dispatcher};
  return <BoardsContext.Provider value={values}>{children}</BoardsContext.Provider>
}

  
export default BoardsContextProvider
export {BoardsContext};

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
