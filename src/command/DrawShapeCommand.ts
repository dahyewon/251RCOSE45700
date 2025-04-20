import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class StartDrawShapeCommand implements Command {
  private shapeModel: ShapeModel;
  private startX: number = 0;
  private startY: number = 0;
  private shapeType: string = "rectangle"; // default shape type

  constructor(
    shapeModel: ShapeModel,
    offsetX: number,
    offsetY: number,
    shapeType: string
  ) {
    this.shapeModel = shapeModel;
    this.startX = offsetX;
    this.startY = offsetY;
    this.shapeType = shapeType;
  }

  execute() {
    this.shapeModel.startDrawShape(this.shapeType, this.startX, this.startY);
  }

  undo() {
    return;
  }

  redo() {
    return;
  }
}

export class ContinueDrawShapeCommand implements Command {
  private shapeModel: ShapeModel;
  private offsetX: number = 0;
  private offsetY: number = 0;

  constructor(shapeModel: ShapeModel, offsetX: number, offsetY: number) {
    this.shapeModel = shapeModel;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  execute() {
    this.shapeModel.continueDrawShape(this.offsetX, this.offsetY);
  }

  undo(): void {
    return;
  }
  redo(): void {
    return;
  }
}

export class EndDrawShapeCommand implements Command {
  private shapeModel: ShapeModel;

  constructor(shapeModel: ShapeModel) {
    this.shapeModel = shapeModel;
  }

  execute() {
    this.shapeModel.endDrawShape();
  }

  undo(): void {
    return;
  }
  redo(): void {
    return;
  }
}
