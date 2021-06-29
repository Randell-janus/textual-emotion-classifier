import { useState } from "react";
import {
  Flex,
  Container,
  Box,
  Tag,
  Text,
  Input,
  Button,
  Heading,
  Divider,
  BeatLoader,
} from "@chakra-ui/react";
import "@fontsource/poppins";

const axios = require("axios");

export default function GoEmotions() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false);

  async function getSentiment() {
    const res = await axios.post("/api/classify", {
      sentence: text,
    });
    setResult(res.data);
    // console.log(res.data);
  }

  const handleGetSentiment = (e) => {
    e.preventDefault();
    getSentiment();
  };

  if (result.error) {
    getSentiment();
  }

  const handleReset = (e) => {
    setResult("");
    setText("");
  };

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Flex
        h={["85vh", "85vh", "90vh"]}
        w="100%"
        align="center"
        justify="center"
        direction="column"
      >
        <Container
          // bg="red"
          bgImage="url('coffee_SVG.svg')"
          backgroundRepeat="no-repeat"
          backgroundPosition="right bottom"
          backgroundSize={["11em", "7em", "11em"]}
          px={19}
          py={8}
          direction="column"
          maxW={["24em", null, "2xl"]}
          h={["md", "27em", "lg"]}
        >
          <Heading fontWeight="500" fontSize={["2rem", null, "3rem"]}>
            How have you been?
          </Heading>
          <Text mt={2} mb={12} fontSize={["0.75rem", null, "1rem"]}>
            Describe how you are feeling today or lately.
          </Text>

          <form onSubmit={handleGetSentiment}>
            <Flex align="center" display="column">
              <Input
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                variant="flushed"
                placeholder="e.g. I had a blast today!"
                fontSize={["1.25rem", null, "2rem"]}
                size="xl"
                maxLength="50"
                minLength="3"
                mb={4}
                disabled={result.error}
              />
              <Flex mb={10}>
                <Button
                  disabled={result.error}
                  mr={4}
                  variant="solid"
                  type="submit"
                  bg="gray.700"
                  color="white"
                  boxShadow="xl"
                  py={0}
                  _focus=""
                  _hover={{ bg: "gray.500" }}
                  isLoading={result.error}
                  loadingText="Detecting"
                  spinnerPlacement="start"
                >
                  Submit
                </Button>
                <Button
                  disabled={result.error}
                  variant="link"
                  onClick={handleReset}
                  _focus=""
                >
                  Clear
                </Button>
              </Flex>
            </Flex>
          </form>
          <Flex align="center">
            <Heading
              mb={1}
              fontWeight="500"
              fontSize={["1.25rem", null, "2rem"]}
            >
              Emotions conveyed
            </Heading>
          </Flex>
          <Divider
            w={["100%", "100%", "75%"]}
            mb={3}
            colorScheme="blackAlpha"
          ></Divider>
          {!result[0] && (
            <Tag
              fontSize={["0.75rem", null, "1rem"]}
              borderRadius="full"
              bg="gray.200"
              my={1}
              px={[2, 2, 3]}
              py={[0, 0, 1]}
            >
              {result.error ? "loading..." : "no emotions detected"}
            </Tag>
          )}
          <Box w={["85%", "85%", "80%"]}>
            {result[0] &&
              result[0]
                .sort((a, b) => b.score - a.score)
                .map(
                  (data, index) =>
                    index < 5 && (
                      <Tag
                        fontSize={["0.75rem", null, "1rem"]}
                        borderRadius="full"
                        bg="gray.700"
                        boxShadow="md"
                        mr={[1, 1, 2]}
                        my={1}
                        px={[2, 2, 3]}
                        py={[0, 0, 1]}
                        key={index}
                        color="white"
                      >
                        <Flex textTransform="capitalize">
                          <Text>
                            {data.label} {(data.score * 100).toFixed(0)}%
                          </Text>
                        </Flex>
                      </Tag>
                    )
                )}
          </Box>
        </Container>
      </Flex>
    </>
  );
}
