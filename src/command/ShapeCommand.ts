import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class startDrawShapeCommand implements Command {
  private shapeModel: ShapeModel;
  private startX: number = 0;
  private startY: number = 0;

  constructor(shapeModel: ShapeModel, offsetX: number, offsetY: number) {
    this.shapeModel = shapeModel;
    this.startX = offsetX;
    this.startY = offsetY;
  }

  execute() {
    this.shapeModel.startDrawShape(this.startX, this.startY);
  }

  undo() {
    return;
  }

  redo() {
    return;
  }
}

export class continueDrawShapeCommand implements Command {
  private shapeModel: ShapeModel;
  private shapeType: string = "rectangle"; // default shape type
  private offsetX: number = 0;
  private offsetY: number = 0;

  constructor(
    shapeModel: ShapeModel,
    shapeType: string,
    offsetX: number,
    offsetY: number
  ) {
    this.shapeModel = shapeModel;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  execute() {
    this.shapeModel.continueDrawShape(
      this.shapeType,
      this.offsetX,
      this.offsetY
    );
  }

  undo(): void {
    return;
  }
  redo(): void {
    return;
  }
}

export class endDrawShapeCommand implements Command {
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
