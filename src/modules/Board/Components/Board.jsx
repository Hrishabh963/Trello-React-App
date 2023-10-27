import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Board = ({ id = "", color = undefined, url = undefined, name = "" }) => {
  const style = {
    h: "10rem",
  };
  return (
    <Box
      id={id}
      className="boards"
      borderRadius={"lg"}
      backgroundColor={color}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
      backgroundImage={url}
      sx={style}
      cursor={'pointer'}
      as={Link}
      to={`/board/${id}`}
    >
      <Text
        textColor={"#fff"}
        p={"1rem"}
        fontSize={{base:"md",md:"lg"}}
        fontWeight={{base:"normal",md:"bold"}}
      >
        {name}
      </Text>
    </Box>
  );
};

export default Board;
