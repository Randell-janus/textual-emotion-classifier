import GoEmotions from "./GoEmotions";
import { Flex, Image, Container, Button, Heading } from "@chakra-ui/react";
import "@fontsource/poppins";

export default function Columns() {
  return (
    <>
      <Flex
        px={[0, 12, 32]}
        align="center"
        justify="center"
        w="100%"
        h="100vh"
        direction={["column", "column", "column", "column", "row"]}
      >
        <Container px={[6, 6, 0]} maxW={["md", "md", "xl", "xl"]}>
          <GoEmotions />
        </Container>
        <Container align="center">
          <Image
            src="coffee_SVG.svg"
            width={[300, 200, 400]}
            height={[300, 300, 400]}
          />
        </Container>
      </Flex>
    </>
  );
}
