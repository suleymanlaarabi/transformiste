import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button, Center, Flex, HStack } from "@chakra-ui/react";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { Box } from "@chakra-ui/react";
import { RatingGroup } from "@chakra-ui/react";
import { useState } from "react";
import { AbsoluteCenter, ProgressCircle } from "@chakra-ui/react";
import { ceil } from "three/tsl";

export function Vote() {
  const [value, setValue] = useState(3);
  const Time = 30;
  return (
    <>
      <Flex
        bg="grey"
        w="100%"
        p="4"
        justify="space-between"
        alignItems="center"
      >
        <RatingGroup.Root
          count={5}
          value={value}
          onValueChange={(e) => setValue(e.value)}
          allowHalf
          colorPalette={"yellow"}
        >
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
        <Box
          background="grey"
          borderColor="border.disabled"
          width="20"
          padding="4"
          color="white"
        >
          Player name
        </Box>
        <ProgressCircle.Root colorPalette="black" value={Time}>
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
          <AbsoluteCenter>
            <ProgressCircle.ValueText />
          </AbsoluteCenter>
        </ProgressCircle.Root>
      </Flex>
    </>
  );
}
