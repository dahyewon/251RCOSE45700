import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class SetPropertyCommand implements Command {
  constructor(
    private shapeModel: ShapeModel,
    private shapeId: number,
    private propertyName: string,
    private value: any
  ) {}

  execute(): void {
    this.shapeModel.setProperty(this.shapeId, this.propertyName, this.value);
  }

  undo(): void {
    // Implement undo logic if needed
  }

  redo(): void {
    this.execute();
  }
}
