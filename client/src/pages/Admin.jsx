import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import PlayListCard from "../components/PlayListCard";

export default function Admin() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  const fetchPlaylistsData = async () => {
    try {
      const response = await axiosInstance.get(`/playlists/admin/all`);
      setPlaylists(response.data.data);
    } catch (error) {
      if (error.response?.status === 403) {
        alert("You are not authorized to access this page.");
        navigate("/playlist");
      }
      return error.response.data;
    }
  };
  useEffect(() => {
    fetchPlaylistsData();
  }, []);

  return (
    <>
      <Box
        background="linear-gradient(180deg, rgba(133,31,137,1) 0%, rgba(88,20,91,1) 19%, rgba(49,11,51,1) 47%, rgba(0,0,0,1) 100%)"
        color="white"
        height="100vh"
        padding={{ base: "60px 30px", lg: "60px 40px" }}
        borderRadius="10px"
      >
        <Flex flexWrap={"wrap"} gap={"10px"} justifyContent={"flex-start"}>
          {playlists.map((playlist) => (
            <PlayListCard
              id={playlist.id}
              cover={playlist.cover}
              title={playlist.title}
              author={playlist.author}
            ></PlayListCard>
          ))}
        </Flex>
      </Box>
    </>
  );
}
