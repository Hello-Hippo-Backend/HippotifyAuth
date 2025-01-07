import { useState } from "react";
import { Box, Flex, Image, Heading, Text, Tabs, Input } from "@chakra-ui/react";
import IMG from "../../public/assets/images/UserProfilePicture.png";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { signup } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleSignup = async () => {
    if (!emailRegex.test(email)) {
      alert("Invalid email");
    } else if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
    } else {
      const response = await signup(username, email, password);
      alert(response.message);
      if (response.success) {
        navigate("/signin");
      }
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
            _hover={{ color: "white" }}
            onClick={() => navigate("/signin")}
          >
            SIGN IN
          </Button>
          <Button
            variant="plain"
            textDecoration="underline"
            textUnderlineOffset="5px"
            textDecorationThickness="2px"
            textDecorationColor="#EC00F0"
            _hover={{ color: "white" }}
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
          <Text mt={"15px"}>Email</Text>
          <Input
            placeholder="Email"
            bgColor={"white"}
            color={"black"}
            borderRadius={"20px"}
            padding={"20px"}
            width={"100%"}
            mt={"5px"}
            onChange={(e) => setEmail(e.target.value)}
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
          <Text mt={"15px"}>Confirm Password</Text>
          <Input
            placeholder="Confirm Password"
            bgColor={"white"}
            color={"black"}
            borderRadius={"20px"}
            padding={"20px"}
            width={"100%"}
            mt={"5px"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>
          <Button
            mt="30px"
            borderRadius="20px"
            width="100%"
            bgColor="#EC00F0"
            color="white"
            onClick={() => handleSignup()}
          >
            SIGN UP
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
