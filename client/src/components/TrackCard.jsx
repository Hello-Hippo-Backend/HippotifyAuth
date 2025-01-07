import { useState } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { Button } from "./ui/button";
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "./ui/popover";
import { FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import { SlTrash } from "react-icons/sl";
import { addTrack, removeTrack } from "../services/playlistService";

export default function TrackCard({
  id,
  isOwned,
  track,
  index,
  ownedPlaylist,
  onRemove,
  onTrackClick,
}) {
  const [open, setOpen] = useState(false);

  const handleAddTrack = async (playlistId) => {
    const response = await addTrack(playlistId, track.track_id);
    if (response.success) {
      alert(`Successfully Add "${track.title}" to playlist`);
    }
  };

  const handleRemoveTrack = async () => {
    const response = await removeTrack(id, track.id);
    if (response.success) {
      onRemove();
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
        cursor="pointer"
        onClick={() => onTrackClick(track)} // Trigger the parent's handler
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
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTrack();
                    }}
                  >
                    <SlTrash />
                    <Text>Remove from this playlist</Text>
                  </Button>
                ) : (
                  ownedPlaylist?.map((playlist) => (
                    <Button
                      key={playlist.id}
                      variant={"plain"}
                      justifyContent={"start"}
                      align={"center"}
                      gap={"10px"}
                      color={"gray.400"}
                      _hover={{ color: "white" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddTrack(playlist.id);
                      }}
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
