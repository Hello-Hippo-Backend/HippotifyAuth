import {
  Text,
  Heading,
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";
import { FaRegClock, FaPlay } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import ProfilePicture from "../../public/assets/images/UserProfilePicture.png";

import { Button } from "../components/ui/button";
import TrackCard from "../components/TrackCard";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

export default function Playlist() {
  const id = useParams().id;
  const [playlist, setPlaylist] = useState([]);
  const navigate = useNavigate();

  const setPlaylistData = async() => {
    try {
      const response = await axiosInstance.get(`/playlist/${id||1}`);
      setPlaylist(response.data.data);
    } catch (error) {
      if (error.response?.status === 403) {
        alert("You are not authorized to access this playlist.");
        navigate("/"); 
    }
      return error.response.data;
    }
  }
  useEffect(() => {
    setPlaylistData();
  }, [id]);
 
  return (
    <>
      <Box
        background="linear-gradient(180deg, rgba(133,31,137,1) 0%, rgba(88,20,91,1) 19%, rgba(49,11,51,1) 47%, rgba(0,0,0,1) 100%)"
        color="white"
        height="100vh"
        padding={{ base: "60px 30px", lg: "60px 40px" }}
        borderRadius="10px"
      >
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          gap={"24px"}
          justifyContent={{ base: "center", lg: "left" }}
          align={{ base: "center", lg: "end" }}
        >
          <Image
            src={playlist.cover}
            width={"200px"}
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"
            borderRadius={"8px"}
          ></Image>
          <Box>
            <Text paddingBottom={"15px"}>{playlist.type} Playlist</Text>
            <Heading
              fontSize={"60px"}
              fontWeight={"bold"}
              paddingBottom={"20px"}
            >
              {playlist.name}
            </Heading>
            <Text color={"gray.300"}>{playlist.description}</Text>
            <Flex
              color={"gray.400"}
              fontSize={"14px"}
              fontWeight={"600"}
              pt={"10px"}
              gap={"5px"}
            >
              <Image src={ProfilePicture} height={"22px"} />
              <Text>
                {playlist.author} - {playlist.tracks?.length} songs
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Box paddingTop={"20px"}>
          <Button
            backgroundColor="#af1fb1"
            color="gray.200"
            borderRadius={"100%"}
            width="50px"
            height="50px"
          >
            <FaPlay />
          </Button>
          <Flex
            width={"100%"}
            padding={"10px"}
            align={"center"}
            color={"gray.400"}
          >
            <Text width={"2%"}>#</Text>
            <Text width={"53%"}>Title</Text>
            <Text width={"23%"}>Album</Text>
            <Text width={"17%"}>Date added</Text>
            <Flex width={"3%"} justifyContent={"end"}>
              <FaRegClock />
            </Flex>
          </Flex>
          <Box height={"1.5px"} bgColor={"gray.600"}></Box>
          <Box pt={"16px"}>
            {playlist.tracks?.map((item, index) => (
              <TrackCard key={item.id} track={item} index={index} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
