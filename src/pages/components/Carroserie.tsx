import { useGLTF } from "@react-three/drei";
import { useAtomValue } from "jotai";
import type { RefObject } from "react";
import { Group, MeshStandardMaterial, type Object3DEventMap } from "three";
import { carroserieSettingsAtom } from "../../atoms";
import type { SceneStaticProps } from "./SceneStatic";

export type CarosserieProps = {
  ref: RefObject<Group<Object3DEventMap> | null>;
} & Partial<SceneStaticProps>;

export function Carroserie({ ref, body, edge }: CarosserieProps) {
  const gltf = useGLTF(`/assets/CarosserieBasique.glb`);
  const settings = useAtomValue(carroserieSettingsAtom);

  const clonedScene = gltf.scene;
  clonedScene.traverse((child: any) => {
    if (child.isMesh) {
      (child.material as MeshStandardMaterial).color.set(
        body || settings.bodyColor.toString("rgb")
      );
      (child.material as MeshStandardMaterial).emissive.set(
        edge || settings.edge.toString("rgb")
      );
    }
  });

  ref.current = clonedScene;

  return <primitive rotation={[0, 0, 0]} object={clonedScene} />;
}
