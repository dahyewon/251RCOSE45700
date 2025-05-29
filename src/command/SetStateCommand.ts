import { CanvasModel } from "../model/CanvasModel";
import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class SetStateCommand implements Command {
  private canvasModel: CanvasModel = CanvasModel.getInstance();
  private shapeModel = ShapeModel.getInstance();
  private stateType: string;
  private shapeType: string;

  constructor(stateType: string, shapeType?: string) {
    this.stateType = stateType;
    this.shapeType = shapeType ? shapeType : "rectangle"; // default shape type
  }
  execute() {
    this.canvasModel.setState(this.stateType);
    this.canvasModel.setShapeType(this.shapeType);
    this.shapeModel.setShapeType(this.shapeType);
  }

  undo(): void {
    return;
  }
  redo(): void {
    return;
  }
}
