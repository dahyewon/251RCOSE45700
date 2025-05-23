import { useEffect, useState } from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { CanvasEvent } from "../viewModel/CanvasEvents";

export function useCanvasStateListener<T>(
  viewModel: CanvasViewModel,
  eventType: string,
  initialState: T,
  key: keyof T
): T[keyof T] {
  const [state, setState] = useState<T[keyof T]>(initialState[key]);

  useEffect(() => {
    const observer = {
      update: (event: CanvasEvent<any>) => {
        if (event.type === eventType && event.data[key] !== undefined) {
          setState(event.data[key]);
        }
      },
    };

    const unsubscribe = viewModel.onChange(observer);
    return unsubscribe;
  }, [viewModel, eventType, key]);

  return state;
}
