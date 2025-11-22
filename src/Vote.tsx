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

/*  <Flex justifyContent={"flex-end"} width="100%">
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
    </Flex>*/
