import { useEffect } from "react";
import { CanvasEvent, CanvasEventType } from "../viewModel/CanvasEvents";
import { Observable } from "../core/Observable";

export function useCanvasActionListener<T>(
  viewModel: Observable<any>,
  eventType: CanvasEventType,
  handler: (data: T) => void
) {
  useEffect(() => {
    const listener = {
      update: (event: CanvasEvent<T>) => {
        if (event.type === eventType) {
          handler(event.data);
        }
      },
    };

    viewModel.subscribe(eventType, listener);
    return () => {
      viewModel.unsubscribe(eventType, listener);
    };
  }, [viewModel, eventType, handler]);
}
