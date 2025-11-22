import { useUser } from "./hooks/useUser.ts";
import { Flex, Heading } from "@chakra-ui/react";
import { Grid, Box } from "@chakra-ui/react"
import Grid_items from "./pages/components/grid_item.tsx";

export default function Results() {
    const user = useUser();

    return (
        <Flex p={4} direction={"column"} h={"100vh"}>
            <Flex
                bg="grey"
                w="100%"
                p="4"
                justify="space-between"
                alignItems="center"
              >
                <Heading>
                    That's the end, {user.name}! {" "}
                </Heading>
                <Heading marginLeft="auto">
                    Transformist
                </Heading>
            </Flex>  
            <Box marginLeft={"auto"} marginRight={"auto"} marginTop={"auto"} marginBottom={"auto"}>
                <Heading marginLeft={"auto"} marginRight={"auto"}>
                    It's time for the results!
                </Heading>
                <Flex direction={"column"} marginLeft={"auto"} marginRight={"auto"} marginTop={"auto"} marginBottom={"auto"}>
                    <Grid
                        h="200px"
                        templateRows="repeat(2, 1fr)"
                        templateColumns="repeat(5, 1fr)"
                        gap={4}
                        >
                        <Grid_items/>
                        <Grid_items/>
                        <Grid_items/>
                        <Grid_items/>
                        <Grid_items/>
                    </Grid>
                </Flex>
            </Box>
  
    </Flex>
    );
}
