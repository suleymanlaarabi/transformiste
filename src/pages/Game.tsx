import { Canvas } from "@react-three/fiber";
import { useUser } from "../hooks/useUser";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { CameraControls } from "@react-three/drei";
import LeftPanel from "./components/LeftPanel";
import { createRef, useState, type RefObject } from "react";
import { Vector3 } from "three";
import type { NodeFC } from "./components/Node";
import { generateUUID } from "three/src/math/MathUtils.js";

export default function Game() {
  const user = useUser();
  const [meshes, setMeshes] = useState<
    { ref: RefObject<Vector3>; node: NodeFC; id: string }[]
  >([]);

  return (
    <Flex p={4} direction={"column"} h={"100vh"}>
      <Heading>
        Have a good game, {user.name}!{" "}
        <Button
          size={"xs"}
          onClick={() => {
            meshes.forEach((el) => {
              console.log(el.ref.current);
            });
          }}
        >
          Test
        </Button>
      </Heading>

      <Flex w={"full"} h={"full"}>
        <Canvas>
          <ambientLight intensity={1} />
          <directionalLight color="white" position={[10, 10, 5]} />
          <CameraControls makeDefault />
          {meshes.map((el) => (
            <el.node key={el.id} ref={el.ref} />
          ))}
        </Canvas>
        <LeftPanel
          spawnMesh={(node) => {
            const ref = createRef() as RefObject<Vector3>;
            ref.current = new Vector3();
            setMeshes((prev) => [
              ...prev,
              {
                ref: ref,
                node,
                id: generateUUID(),
              },
            ]);
          }}
        />
      </Flex>
    </Flex>
  );
}
