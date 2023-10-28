import { Flex, Image, Button, Divider, Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const {bgColor,bgImg} = useSelector((state)=>state.lists)
  const color = bgColor ? bgColor : '';
  const imgUrl = bgImg ? bgImg : '';
  const logoUrl = bgColor || bgImg ? "/assets/Logo/trello-logo-gradient-white@2x.png" : "/assets/Logo/trello-logo-gradient-neutral@2x.png";
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <>
    <Box bgColor={color} bgImage={imgUrl} >
      <Flex h={"2.7rem"} w={'100%'} pl={"1rem"}>
        <Image
          mt={"0.4rem"}
          src={logoUrl}
          alt="Trello"
        />
        <Flex >
          <Button
            onClick={navigateHome}
            variant={"ghost"}
            fontSize={"0.9rem"}
            pt={"0.6rem"}
            transition={"ease-in-out"}
            transitionDuration={"150ms"}
            textColor={bgColor || bgImg ? "white" :"header_items"}
            _hover={{ fontSize: "1.2rem" }}
          >
            Boards
          </Button>
        </Flex>
      </Flex>
      <Divider />
    </Box>
      <Outlet />
    </>
  );
};

export default Header;
