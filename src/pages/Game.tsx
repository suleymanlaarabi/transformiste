import { Canvas } from "@react-three/fiber";
import { useUser } from "../hooks/useUser";
import {
  AbsoluteCenter,
  Flex,
  Heading,
  ProgressCircle,
} from "@chakra-ui/react";
import LeftPanel from "./components/LeftPanel";
import { createRef, memo, useRef, useState, type RefObject } from "react";
import type { NodeFC } from "./components/Node";
import { generateUUID } from "three/src/math/MathUtils.js";
import { Vector3 } from "three";
import { client } from "../apiClient";
import { useNavigate } from "react-router-dom";
import { useInterval } from "../hooks/useInterval";
import { SceneStatic } from "./components/SceneStatic";

export default function Game() {
  const user = useUser();
  const meshesRef = useRef<NodeWithRef[]>([]);
  useInterval(() => {
    const nodes = meshesRef.current.map((el) => ({
      name: el.name,
      position: [el.ref.current.x, el.ref.current.y, el.ref.current.z],
    }));
    console.log(nodes);
    client["register-nodes"].post({
      name: user.name,
      nodes: nodes,
    });
  }, 3000);

  return (
    <Flex p={4} direction={"column"} h={"100vh"}>
      <Flex w={"full"} justify={"space-between"}>
        <Heading>Good game {user.name} </Heading>
        <Timer />
      </Flex>

      <Flex w={"full"} h={"full"}>
        <Scene ref={meshesRef} />
      </Flex>
    </Flex>
  );
}

function Timer() {
  const [timer, setTimer] = useState(100);
  const navigate = useNavigate();
  useInterval(() => {
    client["get-timer"].get().then((res) => {
      setTimer(res.data || 100);
      if ((res.data || 100) <= 0) {
        navigate("/vote");
      }
    });
  }, 1200);
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

type NodeWithRef = {
  Node: NodeFC;
  id: string;
  ref: RefObject<Vector3>;
  name: string;
};

function Scene({ ref }: { ref: RefObject<NodeWithRef[]> }) {
  const [meshes, setMeshes] = useState<NodeWithRef[]>([]);
  ref.current = meshes;
  return (
    <>
      <Canvas>
        <SceneStatic />
        {meshes.map(({ Node, id, ref }) => (
          <Node key={id} ref={ref} name="PresetRoueImport" />
        ))}
      </Canvas>
      <LeftPanelMemo setMeshes={setMeshes} />
    </>
  );
}

type LeftPanelMemoProps = {
  setMeshes: (callback: (prev: NodeWithRef[]) => NodeWithRef[]) => void;
};

const LeftPanelMemo = memo(function LeftPanelMemo({
  setMeshes,
}: LeftPanelMemoProps) {
  return (
    <LeftPanel
      spawnMesh={(Node, name) => {
        const ref = createRef() as RefObject<Vector3>;
        ref.current = new Vector3();
        setMeshes((prev) => [
          ...prev,
          {
            Node,
            id: generateUUID(),
            ref,
            name,
          },
        ]);
      }}
    />
  );
});
