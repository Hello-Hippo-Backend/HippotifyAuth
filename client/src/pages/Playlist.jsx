import {
  Text,
  Heading,
  Box,
  Flex,
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FaRegClock, FaPlay } from "react-icons/fa6";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { Button } from "../components/ui/button";
import TrackCard from "../components/TrackCard";
import { useEffect, useState } from "react";
import {
  fetchOwnedPlaylists,
  fetchPlaylist,
  updatePlaylist,
} from "../services/playlistService";

export default function Playlist() {
  const id = useParams().id;
  const [playlist, setPlaylist] = useState([]);
  const [ownedPlaylist, setOwnedPlaylist] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const navigate = useNavigate();
  const { handleTrackChange } = useOutletContext(); //called parent function (App.jsx)

  const fetchOwnedPlaylistData = async () => {
    const response = await fetchOwnedPlaylists();
    setOwnedPlaylist(response);
  };
  useEffect(() => {
    fetchOwnedPlaylistData();
  }, []);

  const fetchPlaylistData = async () => {
    const response = await fetchPlaylist(id);
    setPlaylist(response);
    if (response.status === 403) {
      alert("You are not authorized to access this playlist.");
      navigate("/playlist");
    }
  };
  useEffect(() => {
    fetchPlaylistData();
  }, [id]);

  const updatePlaylistData = async () => {
    await updatePlaylist(
      playlist.id,
      newTitle || playlist.title,
      newDescription || playlist.description
    );
    fetchPlaylistData();
    fetchOwnedPlaylistData();
    alert(`Playlist updated successfully`);
  };

  const handleTrackRemoval = () => {
    fetchPlaylistData();
  };

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
          {!playlist?.edit_access && (
            <Box>
              <Text paddingBottom={"15px"}>{playlist.type}</Text>
              <Heading
                fontSize={"60px"}
                fontWeight={"bold"}
                paddingBottom={"20px"}
              >
                {playlist.title}
              </Heading>
              <Text color={"gray.300"}>{playlist.description}</Text>
              <Flex
                color={"gray.400"}
                fontSize={"14px"}
                fontWeight={"600"}
                pt={"10px"}
                gap={"5px"}
              >
                <Image src={playlist.image_url} height={"22px"} />
                <Text>
                  {playlist.author} - {playlist.tracks?.length} songs,{" "}
                  {playlist.duration}
                </Text>
              </Flex>
            </Box>
          )}
          {playlist?.edit_access && (
            <DialogRoot placement={"center"}>
              <DialogTrigger asChild>
                <Box>
                  <Text paddingBottom={"15px"}>{playlist.type} Playlist</Text>
                  <Heading
                    fontSize={"60px"}
                    fontWeight={"bold"}
                    paddingBottom={"20px"}
                  >
                    {playlist.title}
                  </Heading>
                  <Text color={"gray.300"}>{playlist.description}</Text>
                  <Flex
                    color={"gray.400"}
                    fontSize={"14px"}
                    fontWeight={"600"}
                    pt={"10px"}
                    gap={"5px"}
                  >
                    <Image src={playlist.image_url} height={"22px"} />
                    <Text>
                      {playlist.author} - {playlist.tracks?.length} songs,{" "}
                      {playlist.duration}
                    </Text>
                  </Flex>
                </Box>
              </DialogTrigger>
              <DialogContent padding={"20px"} backgroundColor={"gray.800"}>
                <DialogHeader>
                  <DialogTitle>Edit details</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <Flex gap={"20px"} pt={"20px"}>
                    <Image
                      src={playlist.cover}
                      width={"200px"}
                      boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"
                      borderRadius={"8px"}
                    ></Image>
                    <Box>
                      <Input
                        placeholder={playlist.title}
                        bgColor={"gray.700"}
                        padding={"10px"}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                      <Textarea
                        mt={"20px"}
                        placeholder={playlist.description}
                        bgColor={"gray.700"}
                        padding={"10px"}
                        height={"70%"}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                      />
                    </Box>
                  </Flex>
                </DialogBody>
                <DialogFooter>
                  <Button
                    mt={"20px"}
                    width="100px"
                    padding={"20px"}
                    borderRadius={"20px"}
                    onClick={() => updatePlaylistData()}
                  >
                    Save
                  </Button>
                </DialogFooter>
                <Text fontSize={"12px"} color={"gray.200"} pt={"10px"}>
                  By proceeding, you agree to give Hipponify access to the image
                  you choose you upload. Please make sure you have the right to
                  upload the image.
                </Text>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
          )}
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
            {playlist.tracks?.map((track, index) => (
              <TrackCard
                key={track.id}
                id={playlist.id}
                isOwned={playlist.edit_access}
                track={track}
                index={index}
                ownedPlaylist={ownedPlaylist}
                onRemove={handleTrackRemoval}
                onTrackClick={handleTrackChange}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
