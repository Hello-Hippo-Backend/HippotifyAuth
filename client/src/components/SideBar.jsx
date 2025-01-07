import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Image } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { FaRegFolder } from "react-icons/fa6";
import { fetchUserPlaylists } from "../services/playlistService";

export default function SideBar({ role }) {
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState([]);

  async function fetchPlaylistData() {
    const response = await fetchUserPlaylists();
    setPlaylist(response);
  }
  useEffect(() => {
    fetchPlaylistData();
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
          gap={"15px"}
          justifyContent={"flex-start"}
        >
          {playlist.map((item) => (
              <Button
                key={item.id}
                variant="plain"
                display="block"
                color="gray"
                padding={"0px 0px 55px 0px"}
                onClick={() => navigate(`/playlist/${item.id}`)}
              >
                <Image src={item.cover} borderRadius={"8px"}></Image>
              </Button>
          ))}
          {role === "Admin" && (
            <Button
              variant="plain"
              display="block"
              color="gray"
              bgColor={"gray.800"}
              width={"100%"}
              height={"60px"}
              _hover={{ bgColor: "gray.700" }}
              onClick={() => navigate("/playlist/admin")}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <FaRegFolder />
              </Box>
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
