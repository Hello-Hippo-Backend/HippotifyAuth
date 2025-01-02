import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Image } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { axiosInstance } from "../utils/axiosInstance";
import { FaRegFolder } from "react-icons/fa6";

export default function SideBar() {
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState([]);
  const [user, setUser] = useState();

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUser(response.data.data);
    } catch (error) {
      return error.response.data;
    }
  };

  async function fetchPlaylistData() {
    try {
      const response = await axiosInstance.get("/playlists");
      setPlaylist(response.data.data);
    } catch (error) {
      return error.response.data;
    }
  }
  useEffect(() => {
    fetchUserData();
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
            <Box key={item.id}>
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
            </Box>
          ))}
          {user?.role === "Admin" && (
            <Button
              variant="plain"
              display="block"
              color="gray"
              bgColor={"gray.800"}
              width={"100%"}
              height={"60px"}
              _hover={{bgColor: "gray.700"}}
              onClick={() => navigate("/playlist/admin")}
            >
              <Box display="flex" justifyContent="center" alignItems="center" >
                <FaRegFolder />
              </Box>
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
