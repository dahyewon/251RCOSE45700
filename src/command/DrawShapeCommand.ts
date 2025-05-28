import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class StartDrawShapeCommand implements Command {
  private shapeModel = ShapeModel.getInstance();
  private offsetX: number;
  private offsetY: number;

  constructor(offsetX: number, offsetY: number) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  execute(): void {
    this.shapeModel.startCreate(this.offsetX, this.offsetY);
  }

  undo(): void {
    // Logic to undo the start of drawing a shape
  }

  redo(): void {
    // Logic to redo the start of drawing a shape
  }
}

export class ContinueDrawShapeCommand implements Command {
  private shapeModel = ShapeModel.getInstance();
  private offsetX: number;
  private offsetY: number;

  constructor(offsetX: number, offsetY: number) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  execute(): void {
    this.shapeModel.continueCreate(this.offsetX, this.offsetY);
  }

  undo(): void {
    // Logic to undo the continuation of drawing a shape
    console.log(
      `Undoing the continuation of drawing a shape at (${this.offsetX}, ${this.offsetY})`
    );
  }

  redo(): void {
    // Logic to redo the continuation of drawing a shape
    console.log(
      `Redoing the continuation of drawing a shape at (${this.offsetX}, ${this.offsetY})`
    );
  }
}

export class EndDrawShapeCommand implements Command {
  private shapeModel = ShapeModel.getInstance();
  private selectedShapeModel = SelectedShapeModel.getInstance();

  execute(): void {
    this.shapeModel.endCreateShape();
    this.selectedShapeModel.updateSelectedShapes(
      this.shapeModel.getShapes().slice(-1)
    );
  }

  undo(): void {
    // Logic to undo the end of drawing a shape
  }

  redo(): void {
    // Logic to redo the end of drawing a shape
  }
}
