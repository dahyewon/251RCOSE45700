import { useEffect } from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { CanvasEvent } from "../viewModel/CanvasEvents";

function useCanvasCommand<T>(
  viewModel: CanvasViewModel,
  eventType: string,
  handler: (data: T) => void
) {
  useEffect(() => {
    const observer = {
      update: (event: CanvasEvent<T>) => {
        if (event.type === eventType) {
          handler(event.data);
        }
      },
    };

    viewModel.subscribe(observer);
    return () => {
      viewModel.unsubscribe(observer);
    };
  }, [viewModel, eventType, handler]);
}

export default useCanvasCommand;
