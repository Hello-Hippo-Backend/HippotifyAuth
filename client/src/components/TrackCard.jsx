import { useEffect, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Button } from "./ui/button";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "./ui/popover";
import { FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import { SlTrash } from "react-icons/sl";
import { axiosInstance } from "../utils/axiosInstance";


export default function TrackCard({ id, isPrivate, track, index, onRemove }) {
  const [open, setOpen] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  
  async function setPlaylistData() {
    try {
      const response = await axiosInstance.get("/playlist/private");
      setPlaylist(response.data.data);
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
  useEffect(() => {
    setPlaylistData();
  }, []);


  const removeSongFromPlaylist = async () => {
    try {
      if (!id || !playlist.id) {
        console.error("ID or Playlist ID is missing");
        return;
      }
      await axiosInstance.delete(`/playlist/track`,{data: {
        id: id,
        playlist_id: playlist.id}
      });
      onRemove(track.id);
      console.log("Remove from my playlist", track.id);
    } catch (error) {
      return error.response.data;
    }
  };
  const addSongToMyPlaylist = async () => {
    try {
      await axiosInstance.post(`/playlist/track`,{
        playlist_id: playlist.id,
        track_id: track.id
      });
      alert(`Successfully Add "${track.title}" to playlist`)
      console.log("Add to my playlist", track.id);
    } catch (error) {
      return error.response.data;
    }
  };
  return (
    <>
      <Flex
        width={"100%"}
        padding={"10px"}
        align={"center"}
        fontSize={"15px"}
        color={"gray.400"}
        _hover={{ bg: "rgba(255, 255, 255, 0.1)", borderRadius: "10px" }}
      >
        <Text width={"2%"}>{index + 1}</Text>
        <Flex width={"53%"}>
          <Image src={track.cover} height={"45px"} borderRadius={"5px"} />
          <Flex flexDir={"column"} pl={"10px"}>
            <Text color={"white"}>{track.title}</Text>
            <Text>{track.artist}</Text>
          </Flex>
        </Flex>
        <Text width={"23%"}>{track.album}</Text>
        <Text width={"17%"}>{track.date_added}</Text>
        <Text width={"3%"}>{track.duration}</Text>
        <PopoverRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
          <PopoverTrigger asChild>
            <Button
              display={track.type === "Admin" ? "none" : "flex"}
              width={"2%"}
              variant="plain"
              color="gray"
              _hover={{ color: "white" }}
            >
              <FaEllipsisVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent background={"gray.900"} width={"100%"}>
            <PopoverBody padding={"10px"}>
            {isPrivate ? (
                <Button
                  variant={"plain"}
                  justifyContent={"start"}
                  align={"center"}
                  gap={"10px"}
                  color={"gray.400"}
                  _hover={{ color: "white" }}
                  onClick={() => removeSongFromPlaylist()}
                >
                  <SlTrash />
                  <Text>Remove from this playlist</Text>
                </Button>
              ) : (
                <Button
                  variant={"plain"}
                  justifyContent={"start"}
                  align={"center"}
                  gap={"10px"}
                  color={"gray.400"}
                  _hover={{ color: "white" }}
                  onClick={() => addSongToMyPlaylist()}
                >
                  <FaPlus />
                  <Text>Add to my playlist</Text>
                </Button>
              )}
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
      </Flex>
    </>
  );
}
