import { useNavigate } from "react-router-dom";
import { Flex, Image } from "@chakra-ui/react";
import { Button } from "./ui/button";
import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { FaChevronLeft } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { signout } from "../services/authService";

export default function Navigation({ user }) {
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signout();
    navigate("/signin");
  };

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="center"
      padding={"10px 20px"}
    >
      <Flex>
        <Button variant="plain" color="gray" onClick={() => navigate(-1)}>
          <FaChevronLeft />
        </Button>
      </Flex>
      <Flex gap={"10px"}>
        <Button
          variant="subtle"
          borderRadius="100%"
          padding="10px"
          onClick={() => navigate("/playlist")}
        >
          <GrHomeRounded color="gray" />
        </Button>
        <Button
          variant="subtle"
          width="400px"
          borderRadius="20px"
          padding="10px"
          display="flex"
          justifyContent="start"
        >
          <FiSearch />
          What do you want to play?
        </Button>
      </Flex>
      <DialogRoot placement={"center"} size={"xs"}>
        <DialogTrigger asChild>
          <Button variant="plain">
            <Image src={user?.image_url} width={"40px"} cursor={"pointer"} />
          </Button>
        </DialogTrigger>
        <DialogContent padding={"20px"}>
          <DialogHeader display={"flex"} justifyContent={"center"} pb={"20px"}>
            <DialogTitle>Do you want to logout?</DialogTitle>
          </DialogHeader>
          <DialogFooter display={"flex"} justifyContent={"center"}>
            <DialogActionTrigger asChild>
              <Button variant="outline" padding="10px">
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button
              bgColor="#af1fb1"
              color="white"
              varient="solid"
              padding="10px"
              onClick={() => handleSignout()}
            >
              Confirm
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Flex>
  );
}
