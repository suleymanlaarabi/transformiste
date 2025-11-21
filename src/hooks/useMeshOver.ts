import { useState } from "react";

export function useMeshOver() {
  const [isOver, setIsOver] = useState(false);

  return [
    isOver,
    {
      onPointerOver: () => setIsOver(true),
      onPointerOut: () => setIsOver(false),
    },
  ] as const;
}
