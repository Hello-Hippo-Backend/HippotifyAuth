import { useState } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

export default function TrackCard({ track, index }) {
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
          <Image src={track.image_url} height={"45px"} borderRadius={"5px"} />
          <Flex flexDir={"column"} pl={"10px"}>
            <Text color={"white"}>{track.title}</Text>
            <Text>{track.artist}</Text>
          </Flex>
        </Flex>
        <Text width={"23%"}>{track.album}</Text>
        <Text width={"17%"}>{track.date_added}</Text>
        <Text width={"3%"}>{track.duration}</Text>
      </Flex>
    </>
  );
}
