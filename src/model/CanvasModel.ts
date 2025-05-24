import { Observable } from "../core/Observable";
import { CanvasEvent } from "../viewModel/CanvasEvents";

export class CanvasModel extends Observable<any> {
  private static instance: CanvasModel;
  private stateType: string = "DrawState"; // default state
  private shapeType?: string = "rectangle"; // default shape type

  public static getInstance(): CanvasModel {
    if (!CanvasModel.instance) {
      CanvasModel.instance = new CanvasModel();
    }
    return CanvasModel.instance;
  }

  notifyStateChanged() {
    const event: CanvasEvent<{
      currentState: string;
      shapeType: string;
    }> = {
      type: "STATE_CHANGED",
      data: {
        currentState: this.getState(),
        shapeType: this.getShapeType(),
      },
    };
    this.notify(event);
  }

  public getState(): string {
    return this.stateType;
  }
  public setState(stateType: string) {
    this.stateType = stateType;
    this.notifyStateChanged();
  }
  public getShapeType(): string {
    if (!this.shapeType) {
      this.shapeType = "rectangle"; // default shape type
    }
    return this.shapeType;
  }
  public setShapeType(type?: string) {
    if (type) this.shapeType = type;
    this.notifyStateChanged();
  }
}
