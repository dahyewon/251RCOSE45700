import { Command } from "../../command/Command";
import { ShapeModel } from "../../model/ShapeModel";
import { ICanvasState } from "./CanvasState";

export class DrawState implements ICanvasState {
  private color = "black";
  private shapeType = "rectangle"; // default shape type
  private drawing = false;
  constructor(private shapeModel: ShapeModel, shapeType: string) {
    this.shapeType = shapeType;
  }

  handleMouseDown(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;

    this.shapeModel.startDrawShape(this.shapeType, offsetX, offsetY);

    this.drawing = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (!this.drawing) return;

    this.shapeModel.continueDrawShape(offsetX, offsetY);
  }

  handleMouseUp(): Command | void {
    if (!this.drawing) return;
    this.drawing = false;

    this.shapeModel.endDrawShape();
  }
}
