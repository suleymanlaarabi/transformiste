import type { CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

export function useCamControls() {
  const cameraControlsRef = useRef<CameraControls>(null);
  const keys = useRef({
    z: false,
    s: false,
    q: false,
    d: false,
    up: false,
    down: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "z") keys.current.z = true;
      if (e.key === "s") keys.current.s = true;
      if (e.key === "q") keys.current.q = true;
      if (e.key === "d") keys.current.d = true;
      if (e.key === "ArrowUp") keys.current.up = true;
      if (e.key === "ArrowDown") keys.current.down = true;
      if (e.key === "ArrowLeft") keys.current.left = true;
      if (e.key === "ArrowRight") keys.current.right = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "z") keys.current.z = false;
      if (e.key === "s") keys.current.s = false;
      if (e.key === "q") keys.current.q = false;
      if (e.key === "d") keys.current.d = false;
      if (e.key === "ArrowUp") keys.current.up = false;
      if (e.key === "ArrowDown") keys.current.down = false;
      if (e.key === "ArrowLeft") keys.current.left = false;
      if (e.key === "ArrowRight") keys.current.right = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(({ camera }) => {
    if (!cameraControlsRef.current) return;

    const speed = 0.1;
    const rotationSpeed = 0.02;
    const controls = cameraControlsRef.current;

    const forward = new Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new Vector3();
    const up = new Vector3(0, 1, 0);
    right.crossVectors(forward, up).normalize();

    if (keys.current.z) {
      controls.forward(speed, true);
    }
    if (keys.current.s) {
      controls.forward(-speed, true);
    }
    if (keys.current.q) {
      controls.truck(-speed, 0, true);
    }
    if (keys.current.d) {
      controls.truck(speed, 0, true);
    }
    if (keys.current.down) {
      controls.truck(0, speed, true);
    }
    if (keys.current.up) {
      controls.truck(0, -speed, true);
    }
    if (keys.current.right) {
      controls.rotate(-rotationSpeed, 0, true);
    }
    if (keys.current.left) {
      controls.rotate(rotationSpeed, 0, true);
    }
  });

  return cameraControlsRef;
}
