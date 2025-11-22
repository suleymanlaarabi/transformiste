import { Canvas } from "@react-three/fiber";
import { useUser } from "../hooks/useUser";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { CameraControls, Environment } from "@react-three/drei";
import LeftPanel from "./components/LeftPanel";
import { createRef, memo, useRef, useState, type RefObject } from "react";
import type { NodeFC } from "./components/Node";
import { generateUUID } from "three/src/math/MathUtils.js";
import { Vector3 } from "three";
import { useCamControls } from "../hooks/useCamControls";

export default function Game() {
  const user = useUser();
  const meshesRef = useRef<NodeWithRef[]>([]);

  return (
    <Flex p={4} direction={"column"} h={"100vh"}>
      <Heading>
        Good game {user.name}{" "}
        <Button size={"xs"} onClick={() => console.log(meshesRef)}>
          Test
        </Button>
      </Heading>

      <Flex w={"full"} h={"full"}>
        <Scene ref={meshesRef} />
      </Flex>
    </Flex>
  );
}

type NodeWithRef = { Node: NodeFC; id: string; ref: RefObject<Vector3> };

function Scene({ ref }: { ref: RefObject<NodeWithRef[]> }) {
  const [meshes, setMeshes] = useState<NodeWithRef[]>([]);
  const [selected, setSelected] = useState<RefObject<Vector3>>();
  ref.current = meshes;
  return (
    <>
      {" "}
      <Canvas>
        <SceneStatic />
        {meshes.map(({ Node, id, ref }) => (
          <Node
            key={id}
            ref={ref}
            selected={selected}
            setSelected={setSelected}
            name="PresetRoueImport"
          />
        ))}
      </Canvas>
      <LeftPanelMemo setMeshes={setMeshes} />
    </>
  );
}

function KeyboardControls() {
  const cameraControlsRef = useCamControls();

  return <CameraControls ref={cameraControlsRef} makeDefault />;
}

const SceneStatic = memo(function SceneStatic() {
  return (
    <>
      <Environment preset="warehouse" background />
      <KeyboardControls />
      <ambientLight intensity={1} />
      <directionalLight color="white" position={[10, 10, 5]} intensity={100} />
    </>
  );
});

type LeftPanelMemoProps = {
  setMeshes: (callback: (prev: NodeWithRef[]) => NodeWithRef[]) => void;
};

const LeftPanelMemo = memo(function LeftPanelMemo({
  setMeshes,
}: LeftPanelMemoProps) {
  return (
    <LeftPanel
      spawnMesh={(Node) => {
        const ref = createRef() as RefObject<Vector3>;
        ref.current = new Vector3();
        setMeshes((prev) => [
          ...prev,
          {
            Node,
            id: generateUUID(),
            ref,
          },
        ]);
      }}
    />
  );
});
