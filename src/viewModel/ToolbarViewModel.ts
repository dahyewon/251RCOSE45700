import { CanvasModel } from "../model/CanvasModel";
import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";

export class ToolbarViewModel {
  public selectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  public shapeModel: ShapeModel = ShapeModel.getInstance();
  public canvasModel: CanvasModel = CanvasModel.getInstance();
  private currentState: string = "DrawState"; // default state
  private shapeType: string = "rectangle"; // default shape type
  private listeners: (() => void)[] = [];
  constructor() {
    const observer = {
      update: () => {
        this.currentState = this.canvasModel.getState();
        this.shapeType = this.canvasModel.getShapeType();
      },
    };
    this.canvasModel.subscribe(observer);
  }

  onChange(fn: () => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners.filter((listener) => listener !== fn);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }

  getShapeType() {
    return this.shapeType;
  }
  getState() {
    return this.currentState;
  }

  setState(state: string, props: any) {
    this.currentState = state;
    if (this.currentState === "DrawState") {
      this.shapeType = props.shapeType;
      this.canvasModel.setShapeType(this.shapeType);
    }
    this.canvasModel.setState(state);
  }
}
