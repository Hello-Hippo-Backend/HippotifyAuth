import { useState } from "react";
import { Box, Flex, Image, Heading, Text, Input } from "@chakra-ui/react";
import IMG from "../../public/assets/images/UserProfilePicture.png";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { signin } from "../services/authService";

export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    const response = await signin(username, password);
    alert(response.message);
    if (response.success) {
      navigate("/playlist");
    }
  };

  return (
    <Flex
      width="100%"
      height="100dvh"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        width="500px"
        padding={"20px 0px"}
        bgColor={"gray.700"}
        borderRadius={"20px"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <Flex alignItems={"center"} gap={"10px"}>
          <Image src={IMG} width={"60px"} borderRadius={"100%"}></Image>
          <Heading fontSize={"30px"}>Hippotify</Heading>
        </Flex>
        <Flex gap={"30px"} mt={"20px"} color={"gray.400"}>
          <Button
            variant="plain"
            textDecoration="underline"
            textUnderlineOffset="5px"
            textDecorationThickness="2px"
            textDecorationColor="#EC00F0"
            _hover={{ color: "white" }}
          >
            SIGN IN
          </Button>
          <Button
            variant="plain"
            _hover={{ color: "white" }}
            onClick={() => navigate("/signup")}
          >
            SIGN UP
          </Button>
        </Flex>
        <Box width={"90%"} padding={"20px"} gap={"20px"}>
          <Text>Username</Text>
          <Input
            placeholder="Username"
            bgColor={"white"}
            color={"black"}
            borderRadius={"20px"}
            padding={"20px"}
            width={"100%"}
            mt={"5px"}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <Text mt={"15px"}>Password</Text>
          <Input
            placeholder="Password"
            bgColor={"white"}
            color={"black"}
            borderRadius={"20px"}
            padding={"20px"}
            width={"100%"}
            mt={"5px"}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Button
            mt="30px"
            borderRadius="20px"
            width="100%"
            bgColor="#EC00F0"
            color="white"
            onClick={() => handleSignin()}
          >
            SIGN IN
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
