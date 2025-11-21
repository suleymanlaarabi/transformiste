import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Provider } from "@/components/ui/provider"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <h1>Hello world!</h1>
      <Button>Click me</Button>
      <App />
    </Provider>
  </StrictMode>
);
