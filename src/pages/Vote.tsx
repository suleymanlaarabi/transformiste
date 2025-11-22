import { useQuery } from "@tanstack/react-query";
import { client } from "../apiClient";
import {
  AbsoluteCenter,
  Flex,
  Heading,
  ProgressCircle,
  RatingGroup,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Node } from "./components/Node";
import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { SceneStatic } from "./components/SceneStatic";
import { useInterval } from "../hooks/useInterval";
import { Navigate, useNavigate } from "react-router-dom";

type Node = {
  name: string;
  position: [number, number, number];
};

export default function Vote() {
  const { data } = useQuery({
    queryKey: ["players"],
    queryFn: async () => await client.players.get(),
  });
  const navigate = useNavigate();

  const players = data?.data || [];

  const [selectedUser, setSelectedUser] = useState<number>(0);

  const nextPlayer = useCallback(() => {
    if (selectedUser > players.length) {
      return navigate("/recap");
    }
    setSelectedUser(selectedUser + 1);
  }, [selectedUser, players, navigate]);

  if (players.length < 1) {
    return;
  }
  const player = players[selectedUser];

  if (!player) {
    return <Navigate to={"/recap"} />;
  }

  return (
    <Flex w={"100vw"} h={"100vh"} direction={"column"}>
      <Flex justifyContent={"space-between"} p={4}>
        <Staring key={player.name} playerName={player.name} />
        <Timer nextPlayer={nextPlayer} />
      </Flex>
      <PlayerScene
        nodes={player.nodes}
        bodyColor={player.bodyColor}
        edgeColor={player.edgeColor}
      />
    </Flex>
  );
}

type TimerProps = {
  nextPlayer: () => void;
};
function Timer({ nextPlayer }: TimerProps) {
  const [timer, setTimer] = useState(15);

  useInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  useEffect(() => {
    if (timer <= 0) {
      nextPlayer();
      setTimer(15);
    }
  }, [timer, nextPlayer]);

  return (
    <ProgressCircle.Root value={timer}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
      <AbsoluteCenter>
        <Heading size={"xs"}>{timer}</Heading>
      </AbsoluteCenter>
    </ProgressCircle.Root>
  );
}

type Props = {
  playerName: string;
};

function Staring({ playerName }: Props) {
  const [hasVoted, setHasVoted] = useState(false);
  const onStar = (count: number) => {
    setHasVoted(true);

    client.vote.post({
      name: playerName,
      stars: count,
    });
  };
  return (
    <RatingGroup.Root
      disabled={hasVoted}
      count={5}
      defaultValue={0}
      size="sm"
      onValueChange={(e) => onStar(e.value)}
    >
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  );
}

type PlayerSceneProps = {
  nodes: { name: string; position: [number, number, number] }[];
  bodyColor: string;
  edgeColor: string;
};

function PlayerScene(props: PlayerSceneProps) {
  const ref = useRef<Vector3>(new Vector3());
  return (
    <Canvas>
      <SceneStatic body={props.bodyColor} edge={props.edgeColor} />
      {props.nodes.map((el, i) => (
        <Node key={i} name={el.name} position={el.position} ref={ref} />
      ))}
    </Canvas>
  );
}
