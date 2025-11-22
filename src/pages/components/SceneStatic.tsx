import { Environment, CameraControls } from "@react-three/drei";
import { memo, useRef } from "react";
import type { Group, Object3DEventMap } from "three";
import { useCamControls } from "../../hooks/useCamControls";
import { Carroserie } from "./Carroserie";

export type SceneStaticProps = {
  body: string;
  edge: string;
};

export const SceneStatic = memo(function SceneStatic(props: SceneStaticProps) {
  const cameraControlsRef = useCamControls();
  const carroserieRef = useRef<Group<Object3DEventMap>>(null);

  return (
    <>
      <Environment
        files={
          "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/citrus_orchard_road_puresky_2k.hdr"
        }
      />
      <hemisphereLight intensity={0.5} color="white" groundColor="black" />
      <CameraControls ref={cameraControlsRef} makeDefault />
      <directionalLight color={"white"} intensity={0.005} />
      <Carroserie ref={carroserieRef} {...props} />
    </>
  );
});
