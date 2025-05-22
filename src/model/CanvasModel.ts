import { Observable } from "../core/Observable";

export class CanvasModel extends Observable {
  private state: string;
  private shapeType: string;

  constructor() {
    super();
    this.state = "DrawState"; // default state
    this.shapeType = "rectangle"; // default shape type
  }

  public getCurrentState(): string {
    return this.state.constructor.name;
  }
  public setCanvasState(state: string) {
    this.state = state;
    this.notify();
  }
  public getShapeType(): string {
    return this.shapeType;
  }
  public setShapeType(type: string) {
    this.shapeType = type;
    this.notify();
  }
}
