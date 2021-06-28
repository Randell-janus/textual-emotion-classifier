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
} from "@chakra-ui/react";
import "@fontsource/poppins";

const axios = require("axios");

export default function GoEmotions() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false);
  const [resultIsPending, setResultIsPending] = useState(false);

  async function getSentiment() {
    const res = await axios.post("/api/classify", {
      sentence: text,
    });
    setResult(res.data);
    console.log(res.data);

    if (!result.error) {
      setResultIsPending(false);
    }
  }

  const handleGetSentiment = (e) => {
    e.preventDefault();
    getSentiment();
  };

  if (result.error) {
    setTimeout(getSentiment, 2000);
    setResultIsPending(true);
  }

  const handleReset = (e) => {
    setResult("");
    setText("");
  };

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Flex h='95vh' align="center" justify="center">
        <Container direction="column" maxW={["26em", null, "xl"]}>
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
                disabled={resultIsPending}
              />
              <Flex>
                <Button
                  disabled={resultIsPending}
                  mr={2}
                  mb={16}
                  variant="outline"
                  type="submit"
                >
                  Detect
                </Button>
                <Button
                  disabled={resultIsPending}
                  variant="outline"
                  onClick={handleReset}
                >
                  Clear
                </Button>
              </Flex>
            </Flex>
          </form>
          <Flex align="center">
            <Heading
              // mt={16}
              mb={1}
              fontWeight="500"
              fontSize={["1.25rem", null, "2rem"]}
            >
              Emotions conveyed
            </Heading>
          </Flex>
          <Divider mb={3} colorScheme="blackAlpha"></Divider>
          {result[0] ? (
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
              )
          ) : (
            <>
              {result.error ? (
                <Tag
                  fontSize={["0.75rem", null, "1rem"]}
                  borderRadius="full"
                  bg="green.200"
                  my={1}
                  px={[2, 2, 3]}
                  py={[0, 0, 1]}
                >
                  detecting emotions...
                </Tag>
              ) : (
                <>
                  <Tag
                    fontSize={["0.75rem", null, "1rem"]}
                    borderRadius="full"
                    bg="gray.200"
                    my={1}
                    px={[2, 2, 3]}
                    py={[0, 0, 1]}
                  >
                    no emotions detected
                  </Tag>
                </>
              )}
            </>
          )}
        </Container>
      </Flex>
    </>
  );
}
