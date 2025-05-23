import { Bindable } from "../core/Bindable";
import { CanvasModel } from "../model/CanvasModel";

export class ToolbarViewModel extends Bindable {
  public canvasModel: CanvasModel = CanvasModel.getInstance();
  private currentState: string = "DrawState"; // default state
  private shapeType: string = "rectangle"; // default shape type

  constructor() {
    super();
    const observer = {
      update: () => {
        this.currentState = this.canvasModel.getState();
        this.shapeType = this.canvasModel.getShapeType();
      },
    };
    this.canvasModel.subscribe(observer);
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
