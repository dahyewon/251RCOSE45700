import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class SetPropertyCommand implements Command {
  private shapeModel: ShapeModel;
  private selectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  constructor(
    private shapeId: number,
    private propertyName: string,
    private value: any
  ) {
    this.shapeModel = ShapeModel.getInstance();
  }

  execute(): void {
    this.shapeModel.setProperty(this.shapeId, this.propertyName, this.value);
    this.selectedShapeModel.notifySelectedShapesUpdated();
  }

  undo(): void {
    // Implement undo logic if needed
  }

  redo(): void {
    this.execute();
  }
}
