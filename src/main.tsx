import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { AbsoluteCenter, Box, For, Text, VStack } from "@chakra-ui/react";
import { Center, Circle, Square } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import { FlakesTexture } from "three/examples/jsm/Addons.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Flex justifyContent={"flex-start"}>
        <Box background="tomato" width="100%" p="7" color="white">
          This is the Box
        </Box>
      </Flex>
      <Flex justifyContent={"flex-end"} width="100%" >
        <Box background="grey" width="25%" p="25rem" color="white"></Box>
      </Flex>
      <Flex justifyContent={"flex-end"} width="100%" >
        <Box background="blue" width="100%" p="10rem" color="white"></Box>
      </Flex>
      <App />
    </Provider>
  </StrictMode>
);
