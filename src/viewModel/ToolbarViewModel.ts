import { CommandManager } from "../command/CommandManager";
import { Observable } from "../core/Observable";
import { CanvasModel } from "../model/CanvasModel";
import { CanvasEvent } from "./CanvasEvents";

export class ToolbarViewModel extends Observable<any> {
  public canvasModel: CanvasModel = CanvasModel.getInstance();
  private commandManager: CommandManager = CommandManager.getInstance();
  private stateType: string = "DrawState"; // default state
  private shapeType?: string = "rectangle"; // default shape type

  constructor() {
    super();
    const canvasStateObserver = {
      update: (
        event: CanvasEvent<{
          stateType: string;
          shapeType?: string;
        }>
      ) => {
        this.stateType = event.data.stateType;
        this.shapeType = event.data.shapeType;
        this.notify(event);
      },
    };
    this.canvasModel.subscribe("STATE_CHANGED", canvasStateObserver);
  }

  getShapeType() {
    return this.shapeType;
  }
  getState() {
    return this.stateType;
  }
}
