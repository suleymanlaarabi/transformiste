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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
