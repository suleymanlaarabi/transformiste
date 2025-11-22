import { GridItem, Box } from "@chakra-ui/react"
import { useUser } from "../../hooks/useUser";
import { RatingGroup } from "@chakra-ui/react"

export default function Grid_items() {
    const user = useUser();
    const user2 = "Killian"

    return (
    <GridItem rowSpan={1.2}>
        <Box bg="tomato" h="100%" w="100%" p="4" color="white" borderRadius="l3">
            {user2}'s final grade : {" "}
            <RatingGroup.Root readOnly count={5} defaultValue={3} size="sm" color="pink">
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
            </RatingGroup.Root>
        </Box>
    </GridItem>
    );
}