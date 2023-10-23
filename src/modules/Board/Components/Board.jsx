import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Board = ({ id = "", color = undefined, url = undefined, name = "" }) => {
  const style = {
    h: "10rem",
    w: "20rem",
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
    >
      <Text
        textColor={"#fff"}
        p={"1rem"}
        fontSize={"lg"}
        fontWeight={"extrabold"}
      >
        {name}
      </Text>
    </Box>
  );
};

export default Board;
