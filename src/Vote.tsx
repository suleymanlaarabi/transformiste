import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { RatingGroup } from "@chakra-ui/react";
import { useState } from "react";
import { AbsoluteCenter, ProgressCircle } from "@chakra-ui/react";

export function Vote() {
  const [value, setValue] = useState(3);
  const Time = 30;
  return (
    <>
      <Flex
        bg="white"
        w="100%"
        p="4"
        justify="space-between"
        alignItems="center"
        color="black"
      >
        <Box
          background="white"
          borderColor="border.disabled"
          width="200px"
          padding="4"
          color="black"
        >
          username
        </Box>
        <AbsoluteCenter axis={"horizontal"}>
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
        </AbsoluteCenter>
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
