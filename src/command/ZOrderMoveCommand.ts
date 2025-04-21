import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class ZOrderMoveCommand implements Command {
  private shapeModel: ShapeModel;
  private action: string;
  private shapeId: number;

  constructor(shapeModel: ShapeModel, action: string, shapeId: number) {
    this.shapeModel = shapeModel;
    this.action = action;
    this.shapeId = shapeId;
  }

  execute(): void {
    this.shapeModel.moveZOrder(this.shapeId, this.action);
  }

  redo(): void {
    this.execute();
  }
  undo(): void {
    // Undo logic if needed
  }
}
