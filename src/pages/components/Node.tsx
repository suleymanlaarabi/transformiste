import { DragControls } from "@react-three/drei";
import { useMeshOver } from "../../hooks/useMeshOver";
import { type ReactNode, type RefObject } from "react";
import { Vector3 } from "three";

export type NodeProps = {
  ref: RefObject<Vector3>;
};

export function Node({ ref }: NodeProps) {
  const [isOver, meshProps] = useMeshOver();

  return (
    <DragControls>
      <mesh
        rotation={[10, 10, 0]}
        scale={isOver ? [1.1, 1.1, 1.1] : [1, 1, 1]}
        {...meshProps}
      >
        <boxGeometry />
        <meshStandardMaterial color={isOver ? "red" : "blue"} />
      </mesh>
    </DragControls>
  );
}

export type NodeFC = (props: NodeProps) => ReactNode;
