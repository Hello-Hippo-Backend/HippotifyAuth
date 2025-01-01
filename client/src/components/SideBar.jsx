import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Image } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { axiosInstance } from "../utils/axiosInstance";

export default function SideBar() {
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState([]);

  async function setPlaylistData() {
    try {
      const response = await axiosInstance.get("/playlists");
      setPlaylist(response.data.data);
    } catch (error) {
      return error.response.data;
    }
  }
  useEffect(() => {
    setPlaylistData();
  }, []);

  return (
    <Box backgroundColor={"black"}>
      <Box
        bgColor={"gray.900"}
        width={"80px"}
        height={"calc(100vh - 140px)"}
        padding={"10px"}
        borderRadius={"8px"}
      >
        <Flex
          flexWrap={"wrap"}
          flexDir={"column"}
          gap={"20px"}
          justifyContent={"flex-start"}
        >
          {playlist.map((item) => (
            <Box key={item.id}>
              <Button
                key={item.id}
                variant="plain"
                display="block"
                color="gray"
                padding={"0px 0px 55px 0px"}
                onClick={() => navigate(`/${item.id}`)}
              >
                <Image src={item.cover} borderRadius={"8px"}></Image>
              </Button>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
