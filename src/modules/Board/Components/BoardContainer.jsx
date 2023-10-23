import { SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useReducer } from "react";
import Board from "./Board";
import { useNavigate } from "react-router-dom";

const BoardContainer = () => {
  const initalState = {
    data: undefined,
    error: false,
    loading: true,
  };

  const navigate = useNavigate();

  //Using useReducer to handle fetch logic
  const [state, dispatcher] = useReducer(reducer, initalState);
  const handleNavigate = (event) => {
    const trigger = event.target.closest(".boards");
    if (!trigger) return;
    navigate(`/board/${trigger.id}`);
  };

  //Handeling inital data fetch
  useEffect(() => {
    getBoards()
      .then((data) => {
        dispatcher({ type: "fetch", payload: data });
      })
      .catch((error) => {
        console.error(error);
        dispatcher({ type: "error" });
      });
  }, []);

  return (
    <SimpleGrid
      my={"4rem"}
      mx={"3rem"}
      columns={{ base: 2, md: 4 }}
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
    </SimpleGrid>
  );
};

export default BoardContainer;

const getBoards = async () => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/members/me/boards?fields=name,id,prefs&key=${
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
    default:
      return state;
  }
};
