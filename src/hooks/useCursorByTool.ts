import { useEffect } from "react";

export function useCursorByTool(currentState: string | undefined) {
  useEffect(() => {
    if (currentState === "DrawState") {
      document.body.style.cursor = "crosshair";
    } else if (
      currentState === "SelectState" ||
      currentState === "MoveState"
    ) {
      document.body.style.cursor = "grab";
    } else if (currentState === "ResizeState") {
      document.body.style.cursor = "grabbing";
    } else {
      document.body.style.cursor = "default";
    }
    return () => {
      document.body.style.cursor = "default";
    };
  }, [currentState]);
}