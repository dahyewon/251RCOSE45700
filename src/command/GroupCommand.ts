import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class GroupCommand implements Command {
  private shapeModel: ShapeModel = ShapeModel.getInstance();

  execute(): void {
    this.shapeModel.groupSelectedShapes();
  }
  undo(): void {
    throw new Error("Method not implemented.");
  }
  redo(): void {
    throw new Error("Method not implemented.");
  }
}

export class UngroupCommand implements Command {
  private shapeModel: ShapeModel = ShapeModel.getInstance();
  constructor(private shapeId: number) {}
  execute(): void {
    const target = this.shapeModel
      .getShapes()
      .find((shape) => shape.id === this.shapeId);
    if (!target)
      throw new Error(`Shape with id:${this.shapeId} does not exist.`);
    this.shapeModel.ungroupSelectedShapes(target);
  }
  undo(): void {
    throw new Error("Method not implemented.");
  }
  redo(): void {
    throw new Error("Method not implemented.");
  }
}
