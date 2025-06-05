import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class StartResizeCommand implements Command {
  private shapeModel = ShapeModel.getInstance();
  private pos: string;
  private offsetX: number;
  private offsetY: number;

  constructor(pos: string, offsetX: number, offsetY: number) {
    this.pos = pos;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  execute(): void {
    this.shapeModel.startResizeSelectedShapes(
      this.pos,
      this.offsetX,
      this.offsetY
    );
    this.shapeModel.notifyShapesUpdated();
  }

  undo(): void {
    // Logic to undo the start of resizing a shape
    console.log(
      `Undoing the start of resizing shape at (${this.offsetX}, ${this.offsetY})`
    );
  }

  redo(): void {
    // Logic to redo the start of resizing a shape
    console.log(
      `Redoing the start of resizing shape at (${this.offsetX}, ${this.offsetY})`
    );
  }
}

export class ContinueResizeCommand implements Command {
  private shapeModel = ShapeModel.getInstance();
  private offsetX: number;
  private offsetY: number;

  constructor(offsetX: number, offsetY: number) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  execute(): void {
    this.shapeModel.resizeSelectedShapes(this.offsetX, this.offsetY);
    this.shapeModel.notifyShapesUpdated();
    this.shapeModel.notifySelectedShapesUpdated();
  }
  undo(): void {
    // Logic to undo the continuation of resizing a shape
    console.log(
      `Undoing the continuation of resizing shape at (${this.offsetX}, ${this.offsetY})`
    );
  }
  redo(): void {
    // Logic to redo the continuation of resizing a shape
    console.log(
      `Redoing the continuation of resizing shape at (${this.offsetX}, ${this.offsetY})`
    );
  }
}
