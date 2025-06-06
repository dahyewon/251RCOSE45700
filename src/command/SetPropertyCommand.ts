import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class SetPropertyCommand implements Command {
  private shapeModel: ShapeModel = ShapeModel.getInstance();
  constructor(
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
