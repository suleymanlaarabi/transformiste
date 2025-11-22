import type { ThreeEvent } from "@react-three/fiber";
import { useState } from "react";

export function useMeshOver() {
  const [isOver, setIsOver] = useState(false);

  return [
    isOver,
    {
      onPointerOver: (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setIsOver(true);
      },
      onPointerOut: () => setIsOver(false),
    },
  ] as const;
}
