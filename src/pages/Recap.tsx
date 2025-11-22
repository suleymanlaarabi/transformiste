import { useQuery } from "@tanstack/react-query";
import { client } from "../apiClient";
import {
  Box,
  Button,
  Flex,
  Heading,
  RatingGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useSetAtom } from "jotai";
import { userAtom } from "../atoms";

type Player = {
  name: string;
  bodyColor: string;
  edgeColor: string;
  votes: number[];
};

type PlayerWithStats = Player & {
  totalScore: number;
  averageScore: number;
  rank: number;
};

export default function Recap() {
  const { data } = useQuery({
    queryKey: ["recap"],
    queryFn: async () => await client.players.get(),
  });

  const players = (data?.data || []) as Player[];

  const rankedPlayers = useMemo<PlayerWithStats[]>(() => {
    const playersWithStats = players.map((player) => {
      const totalScore = player.votes.reduce((sum, vote) => sum + vote, 0);
      const averageScore =
        player.votes.length > 0 ? totalScore / player.votes.length : 0;
      return {
        ...player,
        totalScore,
        averageScore,
        rank: 0,
      };
    });

    playersWithStats.sort((a, b) => b.totalScore - a.totalScore);

    return playersWithStats.map((player, index) => ({
      ...player,
      rank: index + 1,
    }));
  }, [players]);

  const setUser = useSetAtom(userAtom);

  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="column"
      color="white"
      p={8}
      overflowY="auto"
    >
      <VStack gap={6} w="100%" maxW="1200px" mx="auto">
        <Heading size="2xl" mb={4}>
          Leaderboard
        </Heading>

        <Stack w="100%" gap={4}>
          {rankedPlayers.map((player) => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </Stack>
      </VStack>
      <Box mt={4}>
        <Button
          onClick={() => {
            setUser({ name: "" });
          }}
        >
          Exit
        </Button>
      </Box>
    </Flex>
  );
}

type PlayerCardProps = {
  player: PlayerWithStats;
};

function PlayerCard({ player }: PlayerCardProps) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "gold";
      case 2:
        return "silver";
      case 3:
        return "#CD7F32";
      default:
        return "gray.600";
    }
  };

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return "🏆";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  return (
    <Box
      borderRadius="lg"
      p={6}
      borderWidth={2}
      borderColor={getRankColor(player.rank)}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
    >
      <Flex direction={{ base: "column", md: "row" }} gap={6} align="start">
        <Flex align="center" gap={4} flex={1}>
          <Text fontSize="3xl" fontWeight="bold" minW="60px">
            {getRankEmoji(player.rank)}
          </Text>
          <VStack align="start" gap={1}>
            <Heading size="lg">{player.name}</Heading>
            <Text color="gray.400" fontSize="sm">
              {player.votes.length} vote{player.votes.length !== 1 ? "s" : ""}
            </Text>
          </VStack>
        </Flex>

        <Flex gap={8} align="center" wrap="wrap">
          <VStack align="center" gap={1}>
            <Text color="gray.400" fontSize="sm">
              Score Total
            </Text>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={getRankColor(player.rank)}
            >
              {player.totalScore}
            </Text>
          </VStack>
          <VStack align="center" gap={1}>
            <Text color="gray.400" fontSize="sm">
              Moyenne
            </Text>
            <Flex align="center" gap={2}>
              <Text fontSize="xl" fontWeight="bold">
                {player.averageScore.toFixed(2)}
              </Text>
              <RatingGroup.Root
                readOnly
                count={5}
                value={player.averageScore}
                size="sm"
                colorPalette="yellow"
              >
                <RatingGroup.Control />
              </RatingGroup.Root>
            </Flex>
          </VStack>
        </Flex>
      </Flex>

      {player.votes.length > 0 && (
        <Box mt={4} pt={4} borderTopWidth={1} borderColor="gray.700">
          <Text color="gray.400" fontSize="sm" mb={2}>
            Détail des votes:
          </Text>
          <Flex gap={2} wrap="wrap">
            {player.votes.map((vote, index) => (
              <RatingGroup.Root
                key={index}
                readOnly
                count={5}
                value={vote}
                size="xs"
                colorPalette="yellow"
              >
                <RatingGroup.Control />
              </RatingGroup.Root>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
}
