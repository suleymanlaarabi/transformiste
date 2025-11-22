import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

import App from "./App.tsx";
import { Field, Input } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";

function launch() {
  const start_b = document.getElementById("start") as HTMLButtonElement;
  const loading_b = document.getElementById("loading") as HTMLButtonElement;

  start_b.disabled = true;
  start_b.hidden = true;
  loading_b.hidden = false;
}

function Title() {
  return (
    <Flex justifyContent={"flex-start"}>
      <Box background="blue.solid" width="100%" p="7" color="white">
        Transformist
      </Box>
    </Flex>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Title />
    <Flex justifyContent={"flex-end"} width="100%">
      <Box
        marginLeft="auto"
        background="grey"
        width="25%"
        p="23rem"
        color="white"
      ></Box>
    </Flex>
    <Flex justifyContent={"flex-end"} width="100%">
      <Box background="blue" width="100%" p="0.7rem" color="white">
        <Stack
          maxW="sm"
          css={{
            "--field-label-width": "25px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Field.Root orientation="vertical" required marginLeft="auto">
            <Field.Label>Enter a name!</Field.Label>
            <Input backgroundColor="black" />
          </Field.Root>
        </Stack>
        <HStack w={"full"} justifyContent={"center"} padding="5px">
          <Button
            id="start"
            colorPalette="pink"
            variant="solid"
            size="xl"
            rounded="xl"
            onClick={launch}
            visibility="initial"
          >
            Start the fun!
          </Button>
          <Button
            id="loading"
            loading
            loadingText="Jumping in, please wait!"
            colorPalette="pink"
            variant="solid"
            size="xl"
            rounded="xl"
            onClick={launch}
            hidden
            disabled
          />
        </HStack>
      </Box>
    </Flex>
    <App />
  </StrictMode>
);
