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
} from "@chakra-ui/react";
import "@fontsource/poppins";

const axios = require("axios");

export default function GoEmotions() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false);

  async function getSentiment() {
    const res = await axios.post("/api/classify", {
      sentence: text,
    });
    setResult(res.data);
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
    setCount(0);
  };

  const handleTextChange = (e) => {
    const textValue = e.target.value;
    const countValue = e.target.value.length;
    setText(textValue);
    setCount(countValue);
  };

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Flex
        h={["85vh", null, "90vh"]}
        w="100%"
        align="center"
        justify="center"
        direction="column"
      >
        {/* MAIN CONTAINER */}
        <Container
          // bg='red'
          bgImage="url('coffee_SVG.svg')"
          backgroundRepeat="no-repeat"
          backgroundPosition="right bottom"
          backgroundSize={["6em", null, "9em"]}
          p={0}
          direction="column"
          maxW={["22em", null, "2xl"]}
          h={["23em", null, "26em"]}
        >
          <Heading fontWeight="500" fontSize={["1.8rem", null, "2.7rem"]}>
            How have you been?
          </Heading>
          <Text mt={2} mb={12} fontSize={["0.7rem", null, "1rem"]}>
            Describe how you are feeling today or lately.
          </Text>
          {/* MAIN FORM */}
          <form onSubmit={handleGetSentiment}>
            <Flex align="center" display="column">
              <Input
                required
                value={text}
                onChange={handleTextChange}
                variant="flushed"
                placeholder="e.g. I had a blast today!"
                fontSize={["1.25rem", null, "2rem"]}
                size="xl"
                maxLength="50"
                minLength="3"
                mb={4}
                disabled={result.error}
              />
              {/* BUTTONS AND COUNT CONTAINER */}
              <Flex
                mb={["3rem", null, "4rem"]}
                align="center"
                justify="space-between"
              >
                <Flex>
                  <Button
                    disabled={result.error}
                    mr={4}
                    variant="solid"
                    type="submit"
                    bg="gray.700"
                    color="white"
                    boxShadow="xl"
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
                <Text fontSize={["0.7rem", null, "1rem"]}>
                  Limit: {count}/50
                </Text>
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
            w={["57%", null, "48%"]}
            mb={3}
            colorScheme="blackAlpha"
          ></Divider>
          {/* RESULTS SECTION */}
          {!result[0] && (
            <Tag
              fontSize={["0.7rem", null, "1rem"]}
              borderRadius="full"
              bg="gray.200"
              my={1}
              px={[2, 2, 3]}
              py={[0, 0, 1]}
            >
              {result.error ? "loading emotions..." : "no emotions detected"}
            </Tag>
          )}
          <Box>
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
