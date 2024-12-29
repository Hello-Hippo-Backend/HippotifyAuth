import { Card, Image, Box } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export default function PlayListCard({title, cover, id}) {
  const navigate = useNavigate();
  return (
    <Box cursor={"pointer"} onClick={() => navigate(`/playlist/${id}`)}>
      <Card.Root width="250px" height="auto" backgroundColor={"transparent"} _hover={{backgroundColor: "rgba(0,0,0,0.1)"}} color={"gray"} border={"1px solid transparent"} borderRadius={"20px"} padding={"20px"}>
        <Card.Body>
          <Image src={cover} borderRadius={"10px"}></Image>
          <Card.Title paddingTop={"10px"} fontSize={"16px"}>{title}</Card.Title>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
