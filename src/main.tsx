import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button, HStack } from "@chakra-ui/react"
import { Provider } from "@/components/ui/provider"
import { AbsoluteCenter, Box, For, Text, VStack } from "@chakra-ui/react"
import { Center, Circle, Square } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./style.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      
      <Center bg="tomato" h="100px" color="white">
        <h1>Transformist</h1>
        <HStack>
          <Button colorPalette="pink" variant="solid" size="xl">
              Start the fun!
          </Button>
        </HStack>
      </Center>
      <App />
    </Provider>
  </StrictMode>
);
