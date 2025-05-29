import { CanvasEvent } from "../viewModel/CanvasEvents";

interface Observer<T> {
  update: (event: CanvasEvent<T>) => void;
}

export { Observer };
