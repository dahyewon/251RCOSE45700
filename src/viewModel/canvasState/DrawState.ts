import { Command } from "../../command/Command";
import {
  ContinueDrawShapeCommand,
  EndDrawShapeCommand,
  StartDrawShapeCommand,
} from "../../command/ShapeCommand";
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

  handleMouseDown(event: React.MouseEvent): Command | void {
    const { offsetX, offsetY } = event.nativeEvent;
    this.endX = offsetX;
    this.endY = offsetY;

    this.drawing = true;
    return new StartDrawShapeCommand(
      this.shapeModel,
      offsetX,
      offsetY,
      this.shapeType
    );
  }

  handleMouseMove(event: React.MouseEvent): Command | void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시
    if (!this.drawing) return;

    this.endX = offsetX;
    this.endY = offsetY;

    return new ContinueDrawShapeCommand(this.shapeModel, offsetX, offsetY);
  }

  handleMouseUp(): Command | void {
    if (!this.drawing) return;
    this.drawing = false;

    return new EndDrawShapeCommand(this.shapeModel);
  }

  getCurrentShapes(): Shape[] {
    return this.shapeModel.getShapes();
  }
}
