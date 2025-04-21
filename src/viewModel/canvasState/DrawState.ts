import { Command } from "../../command/Command";
import { Shape } from "../../entity/Shape";
import { ShapeModel } from "../../model/ShapeModel";
import { ICanvasState } from "./CanvasState";

export class DrawState implements ICanvasState {
  private startX = 0;
  private startY = 0;
  private endX = 0;
  private endY = 0;
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

  getCurrentShapes(): Shape[] {
    return this.shapeModel.getShapes();
  }
}
