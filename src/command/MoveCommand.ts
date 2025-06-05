import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class StartMoveCommand implements Command {
  private shapeModel = ShapeModel.getInstance();
  private offsetX: number;
  private offsetY: number;

  constructor(offsetX: number, offsetY: number) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  execute(): void {
    this.shapeModel.startMoveSelectedShapes(this.offsetX, this.offsetY);
  }

  undo(): void {
    // Logic to undo the start of moving a shape
    console.log(
      `Undoing the start of moving shape to (${this.offsetX}, ${this.offsetY})`
    );
  }

  redo(): void {
    // Logic to redo the start of moving a shape
    console.log(
      `Redoing the start of moving shape to (${this.offsetX}, ${this.offsetY})`
    );
  }
}

export class ContinueMoveCommand implements Command {
  private shapeModel = ShapeModel.getInstance();
  private offsetX: number;
  private offsetY: number;

  constructor(offsetX: number, offsetY: number) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  execute(): void {
    this.shapeModel.moveSelectedShapes(this.offsetX, this.offsetY);
    this.shapeModel.notifyShapesUpdated();
    this.shapeModel.notifySelectedShapesUpdated();
  }

  undo(): void {
    // Logic to undo the continuation of moving a shape
    console.log(
      `Undoing the continuation of moving shape to (${this.offsetX}, ${this.offsetY})`
    );
  }

  redo(): void {
    // Logic to redo the continuation of moving a shape
    console.log(
      `Redoing the continuation of moving shape to (${this.offsetX}, ${this.offsetY})`
    );
  }
}
