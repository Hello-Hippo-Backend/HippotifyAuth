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

export default function TrackCard({ id, isOwned, track, index, onRemove }) {
  const [open, setOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  async function setPlaylistData() {
    try {
      const response = await axiosInstance.get("/playlists/owned");
      setPlaylists(response.data.data);
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
  useEffect(() => {
    setPlaylistData();
  }, []);

  const addSongToMyPlaylist = async (playlistId) => {
    try {
      await axiosInstance.post(`/playlists/${playlistId}/track/${track.track_id}`);
      alert(`Successfully Add "${track.title}" to playlist`);
      console.log("Add to my playlist", track.id);
    } catch (error) {
      return error.response.data;
    }
  };

  const removeSongFromPlaylist = async () => {
    try {
      await axiosInstance.delete(`/playlists/${id}/track/${track.id}`);
      onRemove(track.id);
      console.log("Remove from my playlist", track.id);
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
              <Flex
                flexWrap={"wrap"}
                flexDir={"column"}
                gap={"20px"}
                justifyContent={"flex-start"}
              >
                {isOwned ? (
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
                  playlists?.map((playlist) => (
                    <Button
                      key={playlist.id}
                      variant={"plain"}
                      justifyContent={"start"}
                      align={"center"}
                      gap={"10px"}
                      color={"gray.400"}
                      _hover={{ color: "white" }}
                      onClick={() => addSongToMyPlaylist(playlist.id)}
                    >
                      <FaPlus />
                      <Text>Add to {playlist.title}</Text>
                    </Button>
                  ))
                )}
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
      </Flex>
    </>
  );
}
