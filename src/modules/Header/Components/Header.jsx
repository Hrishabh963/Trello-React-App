import { Flex, Image, Button, Divider } from "@chakra-ui/react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <>
      <Flex h={"2.7rem"} pl={"1rem"}>
        <Image
          mt={"0.4rem"}
          src="/assets/Logo/trello-logo-gradient-neutral@2x.png"
          alt="Trello"
        />
        <Flex>
          <Button
            onClick={navigateHome}
            variant={"ghost"}
            fontSize={"0.9rem"}
            pt={"0.6rem"}
            transition={"ease-in-out"}
            transitionDuration={"150ms"}
            textColor={"header_items"}
            _hover={{ fontSize: "1.2rem" }}
          >
            Boards
          </Button>
        </Flex>
      </Flex>
      <Divider />
      <Outlet />
    </>
  );
};

export default Header;
