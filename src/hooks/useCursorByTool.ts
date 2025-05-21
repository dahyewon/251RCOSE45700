import { useEffect } from "react";

export function useCursorByTool(currentState: string | undefined) {
  useEffect(() => {
    if (currentState === "DrawState") {
      document.body.style.cursor = "crosshair";
    } else if (
      currentState === "SelectState" ||
      currentState === "MoveState" ||
      currentState === "ResizeState"
    ) {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "default";
    }
    return () => {
      document.body.style.cursor = "default";
    };
  }, [currentState]);
}