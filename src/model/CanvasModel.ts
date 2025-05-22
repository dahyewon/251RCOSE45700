import { Observable } from "../core/Observable";
import { CanvasEvent } from "../viewModel/CanvasEvents";
import { ICanvasState } from "../viewModel/canvasState/CanvasState";
import { DrawState } from "../viewModel/canvasState/DrawState";

export class CanvasModel extends Observable<any> {
  private state: ICanvasState | null = null;
  private shapeType: string;

  constructor() {
    super();
    this.shapeType = "rectangle"; // default shape type
  }

  public setCanvasState(state: ICanvasState) {
    this.state = state;
    this.notifyStateChanged();
  }

  private notifyStateChanged() {
    if (this.state === null) return;
    const event: CanvasEvent<{ currentState: string; drawingShape?: string }> =
      {
        type: "STATE_CHANGED",
        data: {
          currentState: this.state.constructor.name,
          drawingShape:
            this.state instanceof DrawState ? this.shapeType : undefined,
        },
      };
    this.notify(event);
  }
}
