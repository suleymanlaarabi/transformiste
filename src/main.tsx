import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { AbsoluteCenter, Box, For, Text, VStack } from "@chakra-ui/react";
import { Center, Circle, Square } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { FlakesTexture } from "three/examples/jsm/Addons.js";
import { Field, Input } from "@chakra-ui/react"

function launch() {
   const start_b = document.getElementById("start") as HTMLButtonElement;
   const loading_b = document.getElementById("loading") as HTMLButtonElement;

   start_b.disabled = true;
   start_b.hidden = true;
   loading_b.hidden = false;

}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Flex justifyContent={"flex-start"}>
        <Box background="blue.solid" width="100%" p="7" color="white">
          Transformist
        </Box>
      </Flex>
      <Flex justifyContent={"flex-end"} width="100%" >
        <Box marginLeft="auto" background="grey" width="25%" p="23rem" color="white"></Box>
      </Flex>
      <Flex justifyContent={"flex-end"} width="100%" >
        <Box background="blue" width="100%" p="3rem" color="white">
          <Field.Root>
            <Field.Label>Enter a name!</Field.Label>
            <Input backgroundColor="black"/>
          </Field.Root>
          <HStack w={"full"} justifyContent={"center"}>
            <Button id="start" colorPalette="pink" variant="solid" size="xl" rounded="xl" onClick={launch} visibility="initial">
                Start the fun!
            </Button>
            <Button id="loading" loading loadingText="Jumping in, please wait!" colorPalette="pink" variant="solid" size="xl" rounded="xl" onClick={launch} hidden disabled />
          </HStack>
        </Box>
      </Flex>
      <App />
    </Provider>
  </StrictMode>
);
