import { Card, Image, Box, Text } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export default function PlayListCard({ id, cover, title, author }) {
  const navigate = useNavigate();
  return (
    <Box cursor={"pointer"} onClick={() => navigate(`/playlist/${id}`)}>
      <Card.Root
        width="250px"
        height="auto"
        backgroundColor={"transparent"}
        _hover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        border={"1px solid transparent"}
        borderRadius={"20px"}
        padding={"20px"}
      >
        <Card.Body>
          <Image src={cover} borderRadius={"10px"}></Image>
          <Card.Title paddingTop={"10px"} fontSize={"16px"}>
            {title}
          </Card.Title>
          <Text color={"gray"} fontSize={"13px"}>
            Author: {author}
          </Text>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
