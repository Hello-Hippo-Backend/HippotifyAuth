import { Box, Image, Flex, Text } from "@chakra-ui/react";
import MusicCover from "../../public/assets/images/HippoCover.png";
import { GoVideo } from "react-icons/go";
import { FaPlay } from "react-icons/fa6";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { Button } from "./ui/button";

export default function MusicPlayer() {
  return (
    <Flex
      padding={"3px 10px"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex gap={"10px"} justifyContent={"end"} alignItems={"end"}>
        <Image src={MusicCover} height={"55px"} borderRadius={"5px"}></Image>
        <Box>
          <Text>Hippo sound</Text>
          <Text
            fontSize={"14px"}
            color={"gray.300"}
            display={"flex"}
            alignItems={"center"}
            gap={"5px"}
          >
            <GoVideo /> Hippo video - Moo Deng
          </Text>
        </Box>
      </Flex>
      <Flex
        flexDir={"column"}
        gap={"5px"}
        justify={"center"}
        alignItems={"center"}
      >
        <Flex gap={"20px"} justify={"center"} alignItems={"center"}>
            <IoIosSkipBackward size={"20px"}/><Button borderRadius={"20px"}><FaPlay/></Button><IoIosSkipForward size={"20px"}/>
        </Flex>
        <Flex gap={"10px"} justify={"center"} alignItems={"center"} fontSize={"13px"} color={"gray.300"}>
          <Text>55:55</Text>
          <Box
            height={"5px"}
            width={"450px"}
            background={"linear-gradient(90deg, rgba(255,255,255,1) 44%, rgba(84,84,84,1) 44%)"}
            borderRadius={"20px"}
          ></Box>
          <Text>1:59:59</Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10px"}
        pr={"20px"}
      >
        <HiOutlineSpeakerWave size={"20px"} />
        <Box
          height={"4px"}
          width={"100px"}
          bgColor={"gray.300"}
          borderRadius={"20px"}
        ></Box>
      </Flex>
    </Flex>
  );
}
