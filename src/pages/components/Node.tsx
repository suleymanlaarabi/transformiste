import { TransformControls, useGLTF } from "@react-three/drei";
import { useAtomValue } from "jotai";
import { type ReactNode, type RefObject, useRef } from "react";
import { Vector3 } from "three";
import { settingsAtom } from "../../atoms";

export type NodeProps = {
  ref: RefObject<Vector3>;
  name: string;
  position?: [number, number, number];
};

export function Node({ ref, name, position }: NodeProps) {
  const gltf = useGLTF(`/assets/${name}.glb`);
  const settings = useAtomValue(settingsAtom);
  const transformControlsRef = useRef<any>(null);

  const handleChange = () => {
    if (ref.current && transformControlsRef.current?.object) {
      ref.current.copy(transformControlsRef.current.object.position);
    }
  };

  if (position) {
    settings.gizmo = false;
  }

  return (
    <>
      <TransformControls
        ref={transformControlsRef}
        mode="translate"
        showX={settings.gizmo}
        showY={settings.gizmo}
        showZ={settings.gizmo}
        position={position}
        onChange={handleChange}
      >
        {<primitive rotation={[0, 0, 0]} object={gltf.scene.clone()} />}
      </TransformControls>
    </>
  );
}

export type NodeFC = (props: NodeProps) => ReactNode;
