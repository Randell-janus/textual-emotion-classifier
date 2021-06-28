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
  CircularProgress,
  Badge,
  Image,
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
        h="100%"
        w="100%"
        align="center"
        justify="center"
        direction="column"
      >
        <Image
          mt={["8em", null, "6em"]}
          src="coffee_SVG.svg"
          // width={[100, 100, 100]}
          height={[50, 50, 75]}
        />
        <Container
          //   bgImage="url('coffee_SVG.svg')"
          //   backgroundRepeat="no-repeat"
          //   backgroundPosition="right bottom"
          //   backgroundSize="12em"
          px={19}
          py={8}
          direction="column"
          maxW={["26em", null, "xl"]}
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
                placeholder="I had a blast today!"
                fontSize={["1.25rem", null, "2rem"]}
                size="xl"
                maxLength="50"
                minLength="3"
                mb={4}
              />
              <Flex>
                <Button mr={2} mb={16} variant="outline" type="submit">
                  Detect
                </Button>
                <Button variant="outline" onClick={handleReset}>
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
          <Divider mb={3} colorScheme="blackAlpha"></Divider>
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
          {result[0] &&
            result[0]
              .sort((a, b) => b.score - a.score)
              .map(
                (data, index) =>
                  index < 5 && (
                    <Tag
                      fontSize={["0.75rem", null, "1rem"]}
                      borderRadius="full"
                      bg="blue.100"
                      mr={[1, 1, 2]}
                      my={1}
                      px={[2, 2, 3]}
                      py={[0, 0, 1]}
                      key={index}
                    >
                      <Flex textTransform="capitalize">
                        <Text>
                          {data.label} - {(data.score * 100).toFixed(0)}%
                        </Text>
                      </Flex>
                    </Tag>
                  )
              )}
        </Container>
      </Flex>
    </>
  );
}
