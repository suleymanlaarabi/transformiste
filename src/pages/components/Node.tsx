import { TransformControls, useGLTF } from "@react-three/drei";
import { useMeshOver } from "../../hooks/useMeshOver";
import { useRef, type ReactNode, type RefObject } from "react";
import { Mesh, Vector3 } from "three";

export type NodeProps = {
  ref: RefObject<Vector3>;
  selected?: RefObject<Vector3>;
  setSelected: (ref: RefObject<Vector3> | undefined) => void;
  name: string;
};

export function Node({ ref, selected, setSelected, name }: NodeProps) {
  const meshRef = useRef<Mesh>(null);
  const [isOver, { onPointerOver, onPointerOut }] = useMeshOver();
  const hasTransform = !selected || Object.is(selected, ref);
  const gltf = useGLTF(`/assets/${name}.glb`);
  return (
    <>
      <TransformControls
        mode="translate"
        showX={hasTransform}
        showY={hasTransform}
        showZ={hasTransform}
        onPointerOver={(e) => {
          if (hasTransform) {
            onPointerOver(e);
            setSelected(ref);
          }
        }}
        onPointerOut={() => {
          if (isOver) {
            onPointerOut();
            setSelected(undefined);
          }
        }}
      >
        {
          <primitive
            ref={meshRef}
            rotation={[10, 10, 0]}
            object={gltf.scene.clone()}
          />
        }
      </TransformControls>
    </>
  );
}

export type NodeFC = (props: NodeProps) => ReactNode;
