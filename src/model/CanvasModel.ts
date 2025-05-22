import { Observable } from "../core/Observable";

export class CanvasModel extends Observable {
  private static instance: CanvasModel;
  private state: string = "DrawState"; // default state
  private shapeType: string = "rectangle"; // default shape type

  public static getInstance(): CanvasModel {
    if (!CanvasModel.instance) {
      CanvasModel.instance = new CanvasModel();
    }
    return CanvasModel.instance;
  }

  public getState(): string {
    return this.state.constructor.name;
  }
  public setState(state: string) {
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
