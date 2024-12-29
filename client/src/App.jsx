import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

import Navigation from "./components/Navigation";
import SideBar from "./components/SideBar";
import MusicPlayer from "./components/MusicPlayer";

import authMiddleware from "./middleware/authMiddleware";

function App() {
  return (
    <>
      <Box as="nav" position="fixed" top="0" left="0" right="0" zIndex="1000">
        <Navigation />
      </Box>
      <Flex pt="60px" pb="60px" height="100vh" overflow="hidden">
        <Box
          as="aside"
          position="fixed"
          top="60px"
          left="0"
          ml="8px"
          bg="gray.100"
        >
          <SideBar />
        </Box>
        <Box
          as="main"
          ml="100px"
          width="calc(100% - 100px)"
          height="calc(100vh - 140px)"
          overflowY="auto"
        >
          <Outlet />
        </Box>
      </Flex>
      <Box
        as="footer"
        position="fixed"
        left="0"
        right="0"
        bottom="0"
        height="70px"
      >
        <MusicPlayer />
      </Box>
    </>
  );
}

export default authMiddleware(App);