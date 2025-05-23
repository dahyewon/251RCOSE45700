import { Observable } from "../core/Observable";

export class CanvasModel extends Observable {
  private static instance: CanvasModel;
  private state: string = "DrawState"; // default state
  private shapeType: string = "rectangle"; // default shape type
  private stateProps: any | null = null; // default state props

  public static getInstance(): CanvasModel {
    if (!CanvasModel.instance) {
      CanvasModel.instance = new CanvasModel();
    }
    return CanvasModel.instance;
  }

  public getState(): string {
    return this.state.constructor.name;
  }
  public setState(state: string, props?: any) {
    this.state = state;
    this.stateProps = props ? props : null;
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
